import { useRef, useState, DragEvent } from 'react';
import axios from 'axios';
import { StaticContentEndpoints } from '../../api/staticContent/StaticContentEndpoints';

type FileUploadProps = {
    accept?: string;
    onUploaded: (file: { id: number; path: string; filename: string }) => void;
    label?: string;
};

export function FileUpload({ accept, onUploaded, label }: FileUploadProps) {
    const inputRef = useRef<HTMLInputElement>(null);
    const [uploading, setUploading] = useState(false);
    const [dragOver, setDragOver] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const uploadFile = async (file: File) => {
        setUploading(true);
        setError(null);
        try {
            const token = localStorage.getItem('token');
            const formData = new FormData();
            formData.append('file', file);
            const response = await axios.post(
                StaticContentEndpoints.upload(),
                formData,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        'Content-Type': 'multipart/form-data',
                    },
                }
            );
            onUploaded(response.data);
        } catch (err: unknown) {
            if (axios.isAxiosError(err) && err.response?.data?.detail) {
                setError(err.response.data.detail);
            } else {
                setError('Upload failed');
            }
        } finally {
            setUploading(false);
        }
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) uploadFile(file);
    };

    const handleDrop = (e: DragEvent) => {
        e.preventDefault();
        setDragOver(false);
        const file = e.dataTransfer.files?.[0];
        if (file) uploadFile(file);
    };

    return (
        <div
            onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
            onDragLeave={() => setDragOver(false)}
            onDrop={handleDrop}
            onClick={() => inputRef.current?.click()}
            style={{
                border: `2px dashed ${dragOver ? '#4a90d9' : '#ccc'}`,
                borderRadius: '8px',
                padding: '24px',
                textAlign: 'center',
                cursor: 'pointer',
                backgroundColor: dragOver ? '#f0f7ff' : 'transparent',
                transition: 'all 0.2s',
            }}
        >
            <input
                ref={inputRef}
                type="file"
                accept={accept}
                onChange={handleFileChange}
                style={{ display: 'none' }}
            />
            {uploading ? (
                <p>Nahravam...</p>
            ) : (
                <p>{label || 'Kliknite alebo pretiahnite subor'}</p>
            )}
            {error && <p style={{ color: 'red', marginTop: '8px' }}>{error}</p>}
        </div>
    );
}
