# Angular2 Boilerplate

Install:
  1. npm install
  2. gulp

With WebApi:
  1. Create Azure Database.
  2. Update Firewall on database to allow all remote connections (Between 0.0.0.0
     and 255.255.255.255).
  3. Create a stored procedure like this:
     CREATE PROC API.Test
     AS
     BEGIN
      SELECT 1 AS Id, 'Jeff' AS Name
      UNION all
      SELECT 2, 'Brown' AS Name
     END
