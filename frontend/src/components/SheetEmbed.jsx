export default function SheetEmbed({ sheetId, gid }) {
  const url = `https://docs.google.com/spreadsheets/d/1dK_gR99ej2Yf_tWyBo83ZZTWJLQHspUN5PtcE0kwuhM/edit?gid=1029657384#gid=1029657384`;

  return (
    <iframe
      title="Tables"
      src={url}
      width="100%"
      height="600"
      style={{ border: "1px solid #ccc" }}
    />
  );
}
