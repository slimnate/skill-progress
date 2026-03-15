import type { Parameter } from './homeData';

type QuickstartSectionProps = {
    parameters: Parameter[];
    exampleUrl: string;
};

export default function QuickstartSection({
    parameters,
    exampleUrl,
}: QuickstartSectionProps) {
    return (
        <section className='quickstart-section'>
            <h2>Quick Start</h2>
            <div className='parameter-table-wrapper'>
                <table className='parameter-table'>
                    <thead>
                        <tr>
                            <th>Parameter</th>
                            <th>Required</th>
                            <th>Description</th>
                        </tr>
                    </thead>
                    <tbody>
                        {parameters.map((parameter) => (
                            <tr key={parameter.name}>
                                <td>
                                    <code>{parameter.name}</code>
                                </td>
                                <td>{parameter.required}</td>
                                <td>{parameter.description}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <pre>
                <code>{exampleUrl}</code>
            </pre>
        </section>
    );
}
