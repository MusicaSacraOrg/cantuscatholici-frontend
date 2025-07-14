type ExampleComponentProps = {
    title: string;
};

export function ExampleComponent({ title }: ExampleComponentProps) {
    return <div className={'exampleComponent'}>{title}</div>;
}
