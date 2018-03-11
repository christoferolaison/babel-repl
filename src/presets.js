// @flow

import presetEnv from '@babel/preset-env';
import presetEs2015 from '@babel/preset-es2015';
import presetEs2016 from '@babel/preset-es2016';
import presetEs2017 from '@babel/preset-es2017';
import presetStage0 from '@babel/preset-stage-0';
import presetStage1 from '@babel/preset-stage-1';
import presetStage2 from '@babel/preset-stage-2';
import presetStage3 from '@babel/preset-stage-3';
import presetReact from '@babel/preset-react';
import presetFlow from '@babel/preset-flow';

export type Presets =
  | '@babel/preset-env'
  | '@babel/preset-es2015'
  | '@babel/preset-es2016'
  | '@babel/preset-es2017'
  | '@babel/preset-stage-0'
  | '@babel/preset-stage-1'
  | '@babel/preset-stage-2'
  | '@babel/preset-stage-3'
  | '@babel/preset-react'
  | '@babel/preset-flow';

type PresetsMap = { [Presets]: Function };

export const presetsMap: PresetsMap = {
  '@babel/preset-env': presetEnv,
  '@babel/preset-es2015': presetEs2015,
  '@babel/preset-es2016': presetEs2016,
  '@babel/preset-es2017': presetEs2017,
  '@babel/preset-stage-0': presetStage0,
  '@babel/preset-stage-1': presetStage1,
  '@babel/preset-stage-2': presetStage2,
  '@babel/preset-stage-3': presetStage3,
  '@babel/preset-react': presetReact,
  '@babel/preset-flow': presetFlow,
};

export const presets= [
  '@babel/preset-env',
  '@babel/preset-es2015',
  '@babel/preset-es2016',
  '@babel/preset-es2017',
  '@babel/preset-stage-0',
  '@babel/preset-stage-1',
  '@babel/preset-stage-2',
  '@babel/preset-stage-3',
  '@babel/preset-react',
  '@babel/preset-flow',
];
