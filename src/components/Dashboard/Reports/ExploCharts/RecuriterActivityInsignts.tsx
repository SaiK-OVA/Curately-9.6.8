import UseExplo from "./UseExplo";

const RecuriterActivityInsights = () => {
    const { jwt } = UseExplo({ embedID: 'b910mmyAWQ' });
    return (
        <>
            {
                jwt && (
                    <explo-dashboard
                        dash-jwt={jwt}
                        updateUrlParams={true}
                        isProduction={true}
                    />
                )
            }
        </>
    )
}

export default RecuriterActivityInsights
