import './component.component.scss';

/*
* This is the custom components that will support the rendering of the element.
* --CustomComponent
* --CustomHeader
* --CustomFooter
* --CustomForm
 */
export function CustomComponent({title, svg, description, children, className}) {
    return (
        <div className={`custom-component ${className}`}>
            <CustomHeader>
                <div className="container-custom-component__title">
                    <div className="container-custom-component__icon">
                        {svg}
                    </div>
                    <div className="title-custom component-title">
                        {title}
                    </div>
                </div>
            </CustomHeader>

            <div className="container-custom-component__main custom-component__main ">
                {description && <div className="container-custom-component__description">{description}</div>}
                {children}
            </div>
        </div>
    );
}

export function CustomHeader({children, className}) {
    return (
        <div className={`custom-header ${className}`}>
            {children}
        </div>
    );
}

export function CustomFooter({children}) {
    return (
        <div className="custom-footer">
            {children}
        </div>
    );
}

export function CustomForm({children, className, onSubmit}) {
    return (
        <form
            className={`custom-component custom-form ${className}`}
            onSubmit={onSubmit}
        >
            {children}
        </form>
    );
}

