-- Seed: Yosemite Film Commission (tenant #1)
INSERT INTO public.tenants (id, slug, name, domain)
VALUES (
  'a1f05e1c-5f5e-4a5a-9e3a-f1f51ff0f0f1',
  'yfc',
  'Yosemite Film Commission',
  'filmyosemite.com'
)
ON CONFLICT (id) DO NOTHING;
