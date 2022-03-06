const Loading = ({loading=false, className, children}) => {
    if (loading) return <h2 className={className}>Loading . . .</h2>;
    return children;
}

export default Loading;