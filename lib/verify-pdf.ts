import { getVerifySupabase } from '@/lib/supabase-verify';

export const VERIFY_PDF_BUCKET = 'surat-pdf';
export const MAX_PDF_BYTES = 10 * 1024 * 1024;

export function getSuratPdfPublicUrl(pdfPath: string): string {
  const { data } = getVerifySupabase().storage.from(VERIFY_PDF_BUCKET).getPublicUrl(pdfPath);
  return data.publicUrl;
}

export function validatePdfFile(file: File): string | null {
  if (file.type !== 'application/pdf') return 'Hanya file PDF yang diizinkan.';
  if (file.size > MAX_PDF_BYTES) return 'Ukuran PDF maksimal 10 MB.';
  return null;
}

export async function uploadSuratPdf(suratId: string, file: File): Promise<string> {
  const path = `${suratId}.pdf`;
  const { error } = await getVerifySupabase()
    .storage.from(VERIFY_PDF_BUCKET)
    .upload(path, file, { contentType: 'application/pdf', upsert: true });

  if (error) throw error;
  return path;
}

export async function attachSuratPdf(suratId: string, file: File): Promise<void> {
  const pdfPath = await uploadSuratPdf(suratId, file);
  const { error } = await getVerifySupabase()
    .from('surat')
    .update({ pdf_path: pdfPath })
    .eq('id', suratId);

  if (error) throw error;
}
