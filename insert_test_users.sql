-- Insertar usuarios de ejemplo
INSERT INTO "Users" ("Name", "Email", "Role", "PasswordHash") 
VALUES 
  ('Juan Pérez', 'juan@mail.com', 'admin', '$2a$11$YourHashHere'),
  ('María García', 'maria@mail.com', 'user', '$2a$11$YourHashHere'),
  ('Carlos López', 'carlos@mail.com', 'user', '$2a$11$YourHashHere');

-- Verificar que se insertaron
SELECT * FROM "Users";
