import style from './Instruction.module.css';
import AboutProject from './AboutProject/AboutProject';
import ExamplesAndTips from './ExamplesAndTips/ExamplesAndTips';
import FAQ from './FAQ/FAQ';
import GenerateMap from './GenerateMap/GenerateMap';
import GettingStarted from './GettingStarted/GettingStarted';
import GoToGeneration from './GoToGeneration/GoToGeneration';
import SaveExportMap from './SaveExportMap/SaveExportMap';
import SetGenerationParams from './SetGenerationParams/SetGenerationParams';
import SetTileStates from './SetTileStates/SetTileStates';
import SupportFeedback from './SupportFeedback/SupportFeedback';
import Troubleshooting from './Troubleshooting/Troubleshooting';
import UploadTiles from './UploadTiles/UploadTiles';
import { Flex } from 'antd';

const Instruction = ({}) => {
  return (
    <>
      <AboutProject />
      <GettingStarted />
      <UploadTiles />
      <SetTileStates />
      <GoToGeneration />
      <SetGenerationParams />
      <GenerateMap />
      <SaveExportMap />
      <ExamplesAndTips />
      <Troubleshooting />
      <FAQ />
      <SupportFeedback />
    </>
  );
};

export default Instruction;
