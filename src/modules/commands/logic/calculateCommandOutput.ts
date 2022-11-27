import { CommandStep, PreConditionEnum } from "../create";

export default (steps: CommandStep[]) => {
  return steps
    .map((step) => {
      console.log(step);
      let condition = "; ";
      if (step.preCondition === PreConditionEnum.PREVIOUS_HAS_FAILED)
        condition = " || ";
      if (step.preCondition === PreConditionEnum.PREVIOUS_HAS_SUCCESS)
        condition = " && ";

      if (step.index === 0) return step.command;
      return condition + step.command;
    })
    .join("");
};
