function useDownloadPdf(pdfUrl) {
    const uploadIndex = pdfUrl.indexOf("/upload/");
    if (uploadIndex === -1) {
        return pdfUrl;
    }

    const modifiedUrl = pdfUrl.slice(0, uploadIndex + 8) + "fl_attachment/" + pdfUrl.slice(uploadIndex + 8);
    console.log(modifiedUrl)

    const link = document.createElement('a');
    link.href = modifiedUrl;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}

export default useDownloadPdf