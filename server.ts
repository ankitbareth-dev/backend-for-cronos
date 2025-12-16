import app from "./app";
import { config } from "./config/env";

const PORT: number = config.server.port;

app.listen(PORT, () => {
  console.log(`server is running on http://localhost:${PORT}`);
});
