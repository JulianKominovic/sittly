import React, { useMemo } from "react";
import convert from "convert-units";
import { Container } from "@nextui-org/react";
import InputText from "../../ui/form/InputText";
import VirtualizedList, { ListItem } from "../../ui/list/VirtualizedList";
import { ListItemProps } from "../../ui/list/ListItem";
import fuzzysort from "fuzzysort";
import useQuerybar from "../../hooks/useQuerybar";
import useHelper from "../../hooks/useHelper";
import { HelperAction } from "../../store/helperStore";
import { FiCopy } from "react-icons/fi";
import useClipboard from "../../hooks/useClipboard";
import { GrNewWindow } from "react-icons/gr";
import { BsReverseLayoutTextWindowReverse } from "react-icons/bs";
import firstLetterUpperCase from "../../lib/firstLetterUpperCase";

type Props = {};

const COMMON_LIST_ITEMS_PROPS: {
  css: ListItemProps["css"];
} = {
  css: {
    "*": {
      fontSize: "18px",
    },
  },
};

const buildHelperOptions = (
  content: string,
  clipboardActions: any
): HelperAction => {
  return [
    {
      title: "Acciones",
      items: [
        {
          key: "copy",
          title: "Copiar conversión",
          description: `Copiar el resultado "${content}" al portapapeles`,
          icon: <FiCopy />,
          onClick: () => {
            clipboardActions.write(content);
          },
        },
        {
          key: "copy-to-window",
          title: "Pegar conversión en la app actual",
          description: `Pegar el resultado "${content}" en la ventana actual.`,
          icon: <BsReverseLayoutTextWindowReverse />,
          onClick: () => {
            clipboardActions.pasteToCurrentWindow(content);
          },
        },
      ],
    },
  ];
};

const UnitsConversion = (props: Props) => {
  const [measure, setMeasure] = React.useState(0);
  const { value } = useQuerybar();
  const { setHelperOptions } = useHelper(null);
  const { pasteToCurrentWindow, write } = useClipboard();

  const units = React.useMemo(() => {
    const possibilities = convert().measures();

    return possibilities
      .map((unit, i): ListItem[][] => {
        return [
          {
            id: unit + i + "idx",
            divider: true,
            label: unit,
          },
          ...convert()
            .possibilities(unit)
            .map((possibility, index): ListItem[] => {
              return convert()
                .possibilities(unit)
                .map((alternative, idx): any => {
                  const alternativeInfo = convert().describe(alternative);
                  const possibilityInfo = convert().describe(possibility);

                  if (alternative === possibility) return null;

                  return [
                    {
                      id: measure + i + "u" + index + idx,
                      title: `${possibilityInfo.plural} -> ${alternativeInfo.plural}`,
                      divider: false,
                      subtitle: `${Intl.NumberFormat("es", {
                        maximumFractionDigits: 6,
                      }).format(
                        convert(measure).from(possibility).to(alternative)
                      )} ${alternativeInfo.plural}`,
                      icon: <>{possibilityInfo.abbr}</>,
                      onFocus: () => {
                        setHelperOptions(
                          buildHelperOptions(
                            `${Intl.NumberFormat("es", {
                              maximumFractionDigits: 6,
                            }).format(
                              convert(measure).from(possibility).to(alternative)
                            )} ${alternativeInfo.plural}`,
                            { write, pasteToCurrentWindow }
                          )
                        );
                      },
                      ...COMMON_LIST_ITEMS_PROPS,
                    },
                    {
                      id: measure + i + "u2" + index + idx,
                      title: `${alternativeInfo.plural} -> ${possibilityInfo.plural}`,
                      divider: false,
                      subtitle: `${Intl.NumberFormat("es", {
                        maximumFractionDigits: 6,
                      }).format(
                        convert(measure).from(alternative).to(possibility)
                      )} ${possibilityInfo.plural}`,
                      icon: <>{alternativeInfo.abbr}</>,
                      onFocus: () => {
                        setHelperOptions(
                          buildHelperOptions(
                            `${Intl.NumberFormat("es", {
                              maximumFractionDigits: 6,
                            }).format(
                              convert(measure).from(alternative).to(possibility)
                            )} ${possibilityInfo.plural}`,
                            { write, pasteToCurrentWindow }
                          )
                        );
                      },
                      ...COMMON_LIST_ITEMS_PROPS,
                    },
                  ];
                })
                .filter(Boolean);
            }),
        ];
      })
      .flat(3);
  }, [measure]);

  const found = useMemo(() => {
    if (!value) return units;
    return fuzzysort
      .go(value, units, {
        key: "title",
        all: true,
        threshold: -100,
        limit: 100,
      })
      .map((el) => el.obj);
  }, [value, units]);

  console.log(units);

  return (
    <Container css={{ p: "0", m: "0" }}>
      <InputText
        id="measure"
        name="measure"
        label="Valor"
        value={
          !isNaN(measure)
            ? Intl.NumberFormat("es", {
                maximumSignificantDigits: 20,
                maximumFractionDigits: 20,
              }).format(+measure)
            : ""
        }
        type="text"
        onChange={(e) => {
          if (!isNaN(+e.target.value) || !e.target.value) {
            setMeasure(
              parseInt(e.target.value.replaceAll(",", "").replaceAll(".", ""))
            );
          }
        }}
      />
      <VirtualizedList list={found} />
    </Container>
  );
};

export default UnitsConversion;
