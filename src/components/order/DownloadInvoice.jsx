import Link from 'next/link';

export default function DownloadInvoice({ order }) {
  let d = new Date();
  const fileName = `invoice-${d.getDate() + "/" + (d.getMonth() + 1) + "/" + d.getFullYear()}.jpg`;
  const imageUrl = `${order.invoice}`;

  const handleDownload = async () => {
    try {
      const response = await fetch(imageUrl);
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");

      link.href = url;
      link.download = fileName;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
    } catch (err) {
      console.log("Failed to download image:", err);
    }
  };

  return (
    <div className="flex">
      <div className="tooltip" data-tip="Download invoice">
        <Link href="#">
          <button className="btn btn-info btn-sm" onClick={handleDownload}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="size-4"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5M16.5 12 12 16.5m0 0L7.5 12m4.5 4.5V3"
              />
            </svg>
            Invoice
          </button>
        </Link>
      </div>
    </div>
  )
}
