import React from 'react';

const WatchCoursePage = () => {
    return (
        <div>
            Watch this course!
            {"/api/courses/${courseId}/chapters"}
        </div>
    );
};

export default WatchCoursePage;