REVOKE SELECT ON TABLE public.feedback FROM anon, authenticated;
REVOKE SELECT (customer_name, email) ON public.feedback FROM anon, authenticated;
GRANT SELECT (id, rating, category, review_text, sentiment, is_demo, created_at) ON public.feedback TO anon, authenticated;
CREATE POLICY "Open dashboard can read permitted analytics columns"
ON public.feedback FOR SELECT TO anon, authenticated
USING (true);
COMMENT ON POLICY "Open dashboard can read permitted analytics columns" ON public.feedback IS 'The dashboard is intentionally open. Column-level grants restrict reads to analytics fields; customer_name and email remain private. Existing INSERT policy is unchanged.';