import * as React from 'react';

interface LoadingProps {
    loading: boolean
}

const Loading = (props: LoadingProps) => {
    if (!props.loading) {
        return null;
    }

    return <div className="loading" />;
};

export default Loading;