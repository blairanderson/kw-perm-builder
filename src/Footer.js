import * as React from "react";

export default function Footer() {
    const [isLoading, setLoading] = React.useState(true);
    const [data, setData] = React.useState([]);
    const [anchor, setAnchor] = React.useState(
        "Amazon Vendor Seller Migration Consultant"
    );

    const getTools = () => {
        fetch("https://www.shipmentbot.com/tools.json").then((response) => {
            return response.json();
        }).then((json) => {
            const {tools, anchor} = json;
            setData(tools);
            if (anchor) {
                setAnchor(anchor);
            }
        }).catch(error => console.error(error))
            .finally(() => setLoading(false))
    };

    React.useEffect(() => {
        getTools();
    }, []);

    return (
        <div className="container mt-5">
            <footer className="py-3 my-4">
                {isLoading ? (
                    "loading"
                ) : (
                    <ul className="nav justify-content-center border-top border-bottom pt-3 pb-3 mb-3">
                        {Object.keys(data).map((key) => {
                            const item = data[key];
                            return (
                                <li className="nav-item" key={key}>
                                    <a className="nav-link px-2 text-muted" href={item}>
                                        {key}
                                    </a>
                                </li>
                            );
                        })}
                    </ul>
                )}

                <p className="text-center text-muted">
                    © 2022{" "}
                    <a
                        href="https://www.andersonassociates.net"
                        className="nav-link px-2 text-muted"
                    >
                        {anchor}
                    </a>
                </p>
            </footer>
        </div>
    );
}
