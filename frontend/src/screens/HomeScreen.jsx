import React from 'react';
import UploadScorecard from '../components/scorecards/UploadScorecard';

const HomeScreen = () => {
  const handleUploadImage = (file) => {
    console.log('Upload image:', file.name);
  };

  const handleEnterManually = () => {
    console.log('Enter manually');
  };

  const handleUseCamera = (file) => {
    console.log('Use camera:', file.name);
  };

  const handleNeedHelp = () => {
    console.log('Need help');
  };

  return (
    <div>
      <UploadScorecard
        onUploadImage={handleUploadImage}
        onEnterManually={handleEnterManually}
        onUseCamera={handleUseCamera}
        onNeedHelp={handleNeedHelp}
      />
    </div>
  );
};

export default HomeScreen;
