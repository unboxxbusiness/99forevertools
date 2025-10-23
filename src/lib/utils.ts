import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const downloadAsCSV = (data: any, filename: string) => {
    if (!data || data.length === 0) return;

    const isObjectArray = typeof data[0] === 'object' && data[0] !== null;
    
    let csvContent = "data:text/csv;charset=utf-8,";
    
    if (isObjectArray) {
        const headers = Object.keys(data[0]);
        csvContent += headers.join(",") + "\n";

        data.forEach((item: any) => {
            const row = headers.map(header => {
                let cell = item[header] === null || item[header] === undefined ? "" : item[header];
                if (typeof cell === 'string' && cell.includes(',')) {
                    cell = `"${cell}"`;
                }
                return cell;
            }).join(",");
            csvContent += row + "\n";
        });
    } else { // Array of strings
        csvContent += "emails\n"; // Header
        data.forEach((email: string) => {
            csvContent += `${email}\n`;
        });
    }

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `${filename}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}
