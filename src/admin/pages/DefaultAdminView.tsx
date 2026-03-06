import { Container } from '@musica-sacra/layout';
import { Table } from '../../components/table/Table';

export function DefaultAdminView() {
    return (
        <Container>
            <Table
                items={[
                    { id: '1', name: 'John', email: 'john@example.com' },
                    { id: '2', name: 'Jane', email: 'jane@example.com' },
                ]}
                columns={[
                    {
                        key: 'id',
                        label: 'ID',
                        size: 'small',
                        isSortFilter: true,
                    },
                    {
                        key: 'name',
                        label: 'Name',
                        size: 'large',
                        isSortFilter: true,
                    },
                    {
                        key: 'email',
                        label: 'Email',
                        size: 'medium',
                        isSortFilter: false,
                    },
                ]}
                onEdit={() => {}}
                onDelete={() => {}}
            ></Table>
        </Container>
    );
}
