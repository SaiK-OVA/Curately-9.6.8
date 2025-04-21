function DownloadSampleCsv() {

  const csvData = `
SI.No,Name,Email
1,abc,abc@gmail.com`;
  const blob = new Blob([csvData], { type: 'text/csv' });
  const url = URL.createObjectURL(blob);
  const filename = 'sample.csv';

  return (
    <a href={url} download={filename}>
      Download Sample CSV
    </a>
  );
}

export default DownloadSampleCsv;
