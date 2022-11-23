import fuzzysort from 'fuzzysort';
import React, { useMemo } from 'react';
import { BsApp, BsEmojiSmile } from 'react-icons/bs';
import { FiHome, FiSettings } from 'react-icons/fi';
import { FcGoogle } from 'react-icons/fc';
import { HiCommandLine } from 'react-icons/hi2';
import { useNavigate } from 'react-router';
import { GoTerminal } from 'react-icons/go';
import useQuerybar from '../../hooks/useQuerybar';
import { KEYS } from '../../lib/keys';

import List from '../../ui/list';
import Config from '../config';
import Emojis from '../emojis';
import FlexDemo from '../demo';
import useOpenLink from '../../hooks/useOpenLink';
import Commands from '../commands';
import useExecCommand from '../../hooks/useExecCommand';
import { Child } from '@tauri-apps/api/shell';
import { UseStatusStore } from '../../store/statusbarStore';

type OnlyQuerybarModuleProps = {
  querybar: {
    querybarValue: string;
  };
  commands: {
    executeCommand: (cmd: string) => Promise<{
      status: UseStatusStore['asyncStatus'];
      data: Child | null;
    }>;
    killProcess: () => boolean;
  };
};
type OnlyQuerybarModule = {
  onlyQuerybarFuncion: true;
  querybarFunction?: ({ commands, querybar }: OnlyQuerybarModuleProps) => void;
};
type StandardModule = {
  onlyQuerybarFuncion: false;
  indexComponent?: React.ReactNode;
};
type Manifest = {
  module: string;
  displayName: string;
  description: string;
  icon: React.ReactNode;
  entryPoint: OnlyQuerybarModule | StandardModule;
};

export const INDEX: Manifest[] = [
  {
    module: '',
    displayName: 'Home',
    description: 'Home index',
    icon: <FiHome />,
    entryPoint: {
      onlyQuerybarFuncion: false,
      indexComponent: <></>
    }
  },
  {
    module: 'Emojis',
    displayName: 'Emojis',
    description: 'Pick your favourite emoji!',
    icon: <BsEmojiSmile />,
    entryPoint: {
      onlyQuerybarFuncion: false,
      indexComponent: <Emojis />
    }
  },
  {
    module: 'Apps',
    displayName: 'Apps',
    description: 'Apps!',
    icon: <BsApp />,
    entryPoint: {
      onlyQuerybarFuncion: false,
      indexComponent: <FlexDemo />
    }
  },
  {
    module: 'Commands',
    displayName: 'Commands',
    description: 'Save useful commands and secuences',
    icon: <HiCommandLine />,
    entryPoint: {
      onlyQuerybarFuncion: false,
      indexComponent: <Commands />
    }
  },
  {
    module: 'Run command',
    displayName: 'Run command',
    description: 'Run command from Query bar',
    icon: '🚀',
    entryPoint: {
      onlyQuerybarFuncion: true,
      querybarFunction: ({ commands, querybar }) => {
        commands.executeCommand(querybar.querybarValue);
      }
    }
  },
  {
    module: 'Settings',
    displayName: 'Settings',
    description: 'Customize your spotlight',
    icon: <FiSettings />,
    entryPoint: {
      onlyQuerybarFuncion: false,
      indexComponent: <Config />
    }
  }
];

const Index = () => {
  const navigate = useNavigate();
  const { value } = useQuerybar();
  const { openLink } = useOpenLink();
  const { executeCommand, killProcess } = useExecCommand();

  const memoizedIndex: Manifest[] = useMemo(() => {
    if (!value) return INDEX.filter((item) => !item.entryPoint.onlyQuerybarFuncion);
    const filtered = fuzzysort
      .go(value, INDEX, {
        key: 'displayName'
      })
      .map(({ obj }) => obj)
      .filter((item) => !item.entryPoint.onlyQuerybarFuncion);
    if (filtered.length > 0) return filtered;
    return [
      ...INDEX.filter((mod) => mod.entryPoint.onlyQuerybarFuncion),
      {
        icon: <FcGoogle />,
        displayName: 'Google',
        module: 'Google',
        description: `Buscar '${value}' en google`
      }
    ];
  }, [value]);

  return (
    <div>
      <List.Root>
        {memoizedIndex.map((item, index) => (
          <List.Item
            key={item.module + index}
            title={item.displayName}
            subtitle={item.description}
            staging={{
              nextStage: {
                to: item.module
              }
            }}
            icon={item.icon}
            action={{
              callback: () => {
                if (item.module === 'Google') {
                  openLink(`https://google.com/search?q=${value}`);
                }

                if (item.entryPoint.onlyQuerybarFuncion) {
                  item.entryPoint.querybarFunction?.({
                    querybar: {
                      querybarValue: value
                    },
                    commands: {
                      executeCommand,
                      killProcess
                    }
                  });
                } else {
                  navigate(item.module);
                }
              },
              explanation: 'Ir',
              keys: [KEYS.Enter]
            }}
          />
        ))}
      </List.Root>
    </div>
  );
};
export default Index;
