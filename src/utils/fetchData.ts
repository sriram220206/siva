import Papa from 'papaparse';

export const fetchSheetData = async (sheetId: string) => {
    const url = `https://docs.google.com/spreadsheets/d/${sheetId}/export?format=csv`;
    return new Promise<any[]>((resolve) => {
        Papa.parse(url, {
            download: true,
            header: true,
            skipEmptyLines: true,
            complete: (results) => {
                resolve(results.data as any[]);
            },
            error: (err) => {
                console.error("Error fetching CSV for sheet " + sheetId, err);
                resolve([]);
            }
        });
    });
};
