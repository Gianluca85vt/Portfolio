import { useEffect, useRef, useState, useCallback } from 'react';
import { Loader2, MessageCircle, Send } from 'lucide-react';

type Comment = {
  id: string;
  author_name: string;
  body: string;
  created_at: string;
};

type State = 'loading' | 'ready' | 'sending' | 'sent' | 'error';

const SUPABASE_URL = import.meta.env.PUBLIC_SUPABASE_URL;
const SUPABASE_KEY = import.meta.env.PUBLIC_SUPABASE_ANON_KEY;

function when(iso: string) {
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return '';
  return d.toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' });
}

export default function CommentThread({ postSlug }: { postSlug: string }) {
  const [comments, setComments] = useState<Comment[]>([]);
  const [state, setState] = useState<State>('loading');
  const [error, setError] = useState('');
  const [name, setName] = useState('');
  const [body, setBody] = useState('');
  const honeypot = useRef<HTMLInputElement>(null);

  // Read straight from Supabase. Row level security filters to approved rows,
  // so the publishable key cannot expose anything held.
  const load = useCallback(async () => {
    if (!SUPABASE_URL || !SUPABASE_KEY) return;
    const query =
      `${SUPABASE_URL}/rest/v1/comments` +
      `?select=id,author_name,body,created_at` +
      `&post_slug=eq.${encodeURIComponent(postSlug)}` +
      `&approved=is.true&order=created_at.asc`;

    try {
      const res = await fetch(query, {
        headers: { apikey: SUPABASE_KEY, authorization: `Bearer ${SUPABASE_KEY}` },
      });
      const rows: Comment[] = res.ok ? await res.json() : [];
      setComments(Array.isArray(rows) ? rows : []);
    } catch {
      setComments([]);
    }
  }, [postSlug]);

  useEffect(() => {
    load().finally(() => setState('ready'));
  }, [load]);

  const submit = async (event: React.FormEvent) => {
    event.preventDefault();
    setError('');
    if (name.trim().length < 1 || body.trim().length < 2) {
      setError('Leave a name and a couple of words at least.');
      return;
    }
    setState('sending');
    try {
      const res = await fetch('/api/comments', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({
          postSlug,
          authorName: name.trim(),
          body: body.trim(),
          website: honeypot.current?.value ?? '',
        }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        setError(data.error ?? 'Something went wrong. Try again.');
        setState('ready');
        return;
      }
      setName('');
      setBody('');
      setState('sent');

      // Every comment is live the moment it saves, so refetch and let the
      // writer watch their own arrive. That is the whole point of not making
      // them wait for a human.
      await load();
    } catch {
      setError('Could not reach the server. Try again.');
      setState('ready');
    }
  };

  const field =
    'w-full rounded-xl border border-[#D7E2EA]/20 bg-[#141018]/60 px-4 py-3 text-[#D7E2EA] font-light text-sm placeholder:text-[#D7E2EA]/25 outline-none transition-colors duration-200 focus:border-[#D7E2EA]/45';

  return (
    <section className="border-t border-[#D7E2EA]/15 pt-10 mt-14">
      <h2 className="flex items-center gap-2.5 text-[#D7E2EA]/40 font-light uppercase tracking-widest text-[0.65rem] mb-7">
        <MessageCircle className="w-3.5 h-3.5" strokeWidth={1.8} />
        Comments
        {comments.length > 0 ? <span>· {comments.length}</span> : null}
      </h2>

      {state === 'loading' ? (
        <p className="flex items-center gap-2 text-[#D7E2EA]/35 font-light text-sm">
          <Loader2 className="w-3.5 h-3.5 animate-spin" strokeWidth={2} />
          Loading
        </p>
      ) : null}

      {state !== 'loading' && comments.length === 0 ? (
        <p className="text-[#D7E2EA]/35 font-light text-sm">
          Nothing here yet. Yours would be the first.
        </p>
      ) : null}

      {comments.length > 0 ? (
        <ul className="flex flex-col gap-6 mb-12">
          {comments.map((c) => (
            <li key={c.id} className="flex flex-col gap-1.5">
              <div className="flex items-baseline gap-3">
                <span className="text-[#D7E2EA] font-medium text-sm">{c.author_name}</span>
                <span className="text-[#D7E2EA]/25 font-light text-[0.65rem] uppercase tracking-widest">
                  {when(c.created_at)}
                </span>
              </div>
              <p className="text-[#D7E2EA]/60 font-light text-sm leading-relaxed whitespace-pre-line">
                {c.body}
              </p>
            </li>
          ))}
        </ul>
      ) : null}

      {state === 'sent' ? (
        <p className="rounded-xl border border-[#D7E2EA]/25 px-5 py-4 text-[#D7E2EA] font-light text-sm">
          Thanks — it is up there now.
        </p>
      ) : (
        <form onSubmit={submit} className="flex flex-col gap-3 max-w-[520px]">
          {/* Hidden from people, filled in by naive bots. Not display:none, which
              some bots check for; off-screen and out of the tab order instead. */}
          <input
            ref={honeypot}
            type="text"
            name="website"
            tabIndex={-1}
            autoComplete="off"
            aria-hidden="true"
            className="absolute left-[-9999px] w-px h-px opacity-0"
          />

          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Your name"
            maxLength={60}
            required
            className={field}
          />

          <textarea
            value={body}
            onChange={(e) => setBody(e.target.value)}
            placeholder="Say something"
            rows={4}
            maxLength={4000}
            required
            className={`${field} resize-y`}
          />

          {error ? <p className="text-[#E0708A] font-light text-sm">{error}</p> : null}

          <div className="flex items-center gap-4">
            <button
              type="submit"
              disabled={state === 'sending'}
              className="inline-flex items-center gap-2 rounded-full text-white font-medium uppercase tracking-widest px-7 py-3 text-xs transition-transform duration-300 hover:scale-[1.03] disabled:opacity-50 disabled:hover:scale-100"
              style={{
                background:
                  'linear-gradient(123deg, #18011F 7%, #B600A8 37%, #7621B0 72%, #BE4C00 100%)',
              }}
            >
              {state === 'sending' ? (
                <Loader2 className="w-3.5 h-3.5 animate-spin" strokeWidth={2} />
              ) : (
                <Send className="w-3.5 h-3.5" strokeWidth={2} />
              )}
              Post
            </button>

            <span className="text-[#D7E2EA]/30 font-light text-[0.7rem]">
              Appears straight away. Disagree as hard as you like.
            </span>
          </div>
        </form>
      )}
    </section>
  );
}
