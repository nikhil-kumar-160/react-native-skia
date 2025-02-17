import type {
  RequiredAnimationParams,
  AnimationParams,
  TimingConfig,
  SpringConfig,
} from "../../types";

const DefaultParameters = {
  to: 1,
  loop: false,
  yoyo: false,
  immediate: true,
};

const DefaultTimingConfig = {
  duration: 1000,
  easing: (t: number) => t,
};

/**
 * Resolves parameters from optional values to a single object
 * @param toOrParams Params or to value
 * @param config timing/spring configuration
 */
export const getResolvedParams = (
  toOrParams: number | AnimationParams,
  config?: TimingConfig | SpringConfig
): RequiredAnimationParams & Required<TimingConfig> => {
  let resolvedParameters: RequiredAnimationParams = {
    ...DefaultParameters,
  };

  if (typeof toOrParams === "number") {
    resolvedParameters.to = toOrParams;
  } else {
    resolvedParameters = {
      from: toOrParams.from ?? resolvedParameters.from,
      to: toOrParams.to ?? resolvedParameters.to,
      loop: toOrParams.loop ?? resolvedParameters.loop,
      yoyo: toOrParams.yoyo ?? resolvedParameters.yoyo,
    };
  }

  const resolvedConfig: Required<TimingConfig> = { ...DefaultTimingConfig };
  if (config) {
    if ("update" in config) {
      // Spring
      resolvedConfig.duration = config.duration;
      resolvedConfig.easing = config.update;
    } else {
      resolvedConfig.duration = config.duration;
      resolvedConfig.easing = config.easing ?? ((t) => t);
    }
  }

  return { ...resolvedParameters, ...resolvedConfig };
};
