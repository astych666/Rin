import { getCookie } from "typescript-cookie";

// 定义一个映射表，将文件扩展名与 Content-Type 关联起来
const contentTypeMap: { [extension: string]: string } = {
  'jpg': 'image/jpeg',
  'jpeg': 'image/jpeg',
  'png': 'image/png',
  'gif': 'image/gif',
  // ... 添加更多文件类型 ...
};

// 获取文件扩展名
function getFileExtension(filename: string): string {
  const parts = filename.split('.');
  return parts[parts.length - 1].toLowerCase();
}

// 根据文件扩展名获取 Content-Type
function getContentType(filename: string): string {
  const extension = getFileExtension(filename);
  return contentTypeMap[extension] || 'application/octet-stream'; // 默认 Content-Type
}

export function headersWithAuth(filename?: string) {
  const headers: { [key: string]: string } = {
    'Authorization': `Bearer ${getCookie('token')}`
  };

  // 如果提供了文件名，则设置 Content-Type
  if (filename) {
    headers['Content-Type'] = getContentType(filename);
  }

  return headers;
}
