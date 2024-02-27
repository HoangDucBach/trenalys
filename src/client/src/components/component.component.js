import './component.component.scss';

export function CustomComponent({title, svg, description, children}) {
    return (
        <div className="custom-component">
            <div className="container-custom-component__title">
                <div className="container-custom-component__icon">
                    {svg}
                </div>
                <div className="title-custom component-title">
                    {title}
                </div>
            </div>
            <div className="container-custom-component__description">
                {description}</div>
            <div className="container-custom-component__main">{children}</div>
        </div>
    );
}