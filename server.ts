import app from "./app";

const PORT: number = 5000;

app.listen(PORT, () => {
  console.log(`server is running on http://localhost:${PORT}`);
});
