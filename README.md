# Angular2 Boilerplate

## Install:
  1. npm install
  2. gulp

## With WebApi:
  1. Create Azure Database.
  2. Update Firewall on database to allow all remote connections (Between 0.0.0.0
   and 255.255.255.255).
  3. Create a stored procedure like this:
```sql
CREATE SCHEMA API
GO
CREATE PROC API.Test
AS
BEGIN
SELECT 1 AS Id, 'Jeff' AS Name
UNION all
SELECT 2, 'Brown' AS Name
END
```
  4. Update the webapi/WebApi/Web.Config ConnectionString.
  5. Publish to azure app service.
  6. Update baseUrl in httpService.ts
  7. Reload #/webapi
