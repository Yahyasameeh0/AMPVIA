-- Products table: catalog of electrical products
CREATE TABLE products (
  id          uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name        text NOT NULL,
  category    text NOT NULL,
  description text,
  price       text,
  capacity    text,
  voltage     text,
  features    text[] DEFAULT '{}',
  image_url   text,
  href        text,
  sort_order  int DEFAULT 0,
  created_at  timestamptz DEFAULT now(),
  updated_at  timestamptz DEFAULT now()
);

-- Projects table: featured/completed projects
CREATE TABLE projects (
  id          uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title       text NOT NULL,
  category    text NOT NULL,
  description text,
  location    text,
  image_url   text,
  sort_order  int DEFAULT 0,
  created_at  timestamptz DEFAULT now(),
  updated_at  timestamptz DEFAULT now()
);

-- Quote requests: submitted from contact form and cart
CREATE TABLE quote_requests (
  id          uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name        text NOT NULL,
  email       text NOT NULL,
  phone       text,
  company     text,
  subject     text,
  message     text,
  items       jsonb DEFAULT '[]',
  status      text NOT NULL DEFAULT 'new'
                        CHECK (status IN ('new','read','quoted','closed')),
  source      text NOT NULL DEFAULT 'contact'
                        CHECK (source IN ('contact','cart')),
  created_at  timestamptz DEFAULT now(),
  updated_at  timestamptz DEFAULT now()
);

-- Admin users: simple table for admin panel auth
CREATE TABLE admin_users (
  id          uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  email       text NOT NULL UNIQUE,
  password_hash text NOT NULL,
  name        text NOT NULL,
  created_at  timestamptz DEFAULT now()
);

-- Enable RLS on all tables
ALTER TABLE products ENABLE ROW LEVEL SECURITY;
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE quote_requests ENABLE ROW LEVEL SECURITY;
ALTER TABLE admin_users ENABLE ROW LEVEL SECURITY;

-- Products: public read, admin full access
CREATE POLICY "products_public_select" ON products FOR SELECT
  TO anon, authenticated USING (true);
CREATE POLICY "products_admin_insert" ON products FOR INSERT
  TO authenticated WITH CHECK (true);
CREATE POLICY "products_admin_update" ON products FOR UPDATE
  TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "products_admin_delete" ON products FOR DELETE
  TO authenticated USING (true);

-- Projects: public read, admin full access
CREATE POLICY "projects_public_select" ON projects FOR SELECT
  TO anon, authenticated USING (true);
CREATE POLICY "projects_admin_insert" ON projects FOR INSERT
  TO authenticated WITH CHECK (true);
CREATE POLICY "projects_admin_update" ON projects FOR UPDATE
  TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "projects_admin_delete" ON projects FOR DELETE
  TO authenticated USING (true);

-- Quote requests: anyone can insert, only authenticated can read/update/delete
CREATE POLICY "quotes_public_insert" ON quote_requests FOR INSERT
  TO anon, authenticated WITH CHECK (true);
CREATE POLICY "quotes_admin_select" ON quote_requests FOR SELECT
  TO authenticated USING (true);
CREATE POLICY "quotes_admin_update" ON quote_requests FOR UPDATE
  TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "quotes_admin_delete" ON quote_requests FOR DELETE
  TO authenticated USING (true);

-- Admin users: only authenticated can read
CREATE POLICY "admin_auth_select" ON admin_users FOR SELECT
  TO authenticated USING (true);

-- updated_at trigger function
CREATE OR REPLACE FUNCTION set_updated_at()
RETURNS trigger AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER products_updated_at BEFORE UPDATE ON products
  FOR EACH ROW EXECUTE FUNCTION set_updated_at();
CREATE TRIGGER projects_updated_at BEFORE UPDATE ON projects
  FOR EACH ROW EXECUTE FUNCTION set_updated_at();
CREATE TRIGGER quotes_updated_at BEFORE UPDATE ON quote_requests
  FOR EACH ROW EXECUTE FUNCTION set_updated_at();

-- Seed some sample products
INSERT INTO products (name, category, description, price, capacity, voltage, features, image_url, href, sort_order) VALUES
  ('Main Distribution Board (MDB)', 'Distribution Panels', 'Industrial-grade main distribution board with copper busbars and modular design.', 'From $2,500', 'Up to 4000A', '400V AC, 50Hz', '{"IP54 Protection","Modular Design","MCB/MCCB Integration","Emergency Shutoff"}', '/product-mdb.jpg', '/distribution-panels', 1),
  ('Sub-Distribution Board (SDB)', 'Distribution Panels', 'Compact sub-distribution board ideal for secondary power distribution.', 'From $1,200', 'Up to 630A', '400V AC, 50Hz', '{"Compact Design","DIN Rail Mounting","Clear Labeling","Easy Maintenance"}', '/product-sdb.jpg', '/distribution-panels', 2),
  ('Floor Standing Panel', 'Distribution Panels', 'Heavy duty floor standing panel for large-scale power distribution.', 'Custom Quote', 'Up to 6300A', '400V AC, 50Hz', '{"Heavy Duty","Multi-Section","Busbar System","Metering Ready"}', '/product-floor.jpg', '/distribution-panels', 3);

-- Seed some sample projects
INSERT INTO projects (title, category, description, location, image_url, sort_order) VALUES
  ('Cairo Financial Center', 'Commercial', 'Complete electrical distribution system for 40-story financial district tower.', 'Cairo, Egypt', '/project-cairo.jpg', 1),
  ('Alexandria Industrial Park', 'Industrial', 'Power distribution and control panels for a 50,000 sqm manufacturing complex.', 'Alexandria, Egypt', '/project-alex.jpg', 2),
  ('New Administrative Capital Mall', 'Commercial', 'Architectural lighting and power for the largest retail complex in the new capital.', 'New Capital, Egypt', '/project-mall.jpg', 3);
