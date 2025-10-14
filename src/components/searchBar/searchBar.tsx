import { Button, FormContent, FormRow, Input } from '@musica-sacra/forms';
import { useUrlParams } from '../../views/homepageView/useUrlParams';
import { FormEvent, useState } from 'react';

type SearchBarProps = {
    placeholder: string;
};

export function SearchBar({ placeholder }: SearchBarProps) {
    const { getParams, setParams } = useUrlParams();

    const params = getParams();
    const [searchQuery, setSearchQuery] = useState(params.searchQuery || '');

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();

        setParams({
            searchQuery: searchQuery || null,
        });
    };

    return (
        <form onSubmit={handleSubmit}>
            <FormContent>
                <FormRow>
                    <Input
                        placeholder={placeholder}
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                    <Button rounded>Hľadať</Button>
                </FormRow>
            </FormContent>
        </form>
    );
}
