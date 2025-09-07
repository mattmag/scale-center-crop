// SPDX-License-Identifier: AGPL-3.0-or-later

export const DEVICE_CLASS_VALUES = ["phone", "tablet", "pc"] as const;
export type DeviceClass = typeof DEVICE_CLASS_VALUES[number];  

export const MOBILE_OS_VALUES = ["android", "ios"] as const;
export type MobileOS = typeof MOBILE_OS_VALUES[number];  

export const DESKTOP_OS_VALUES = ["windows", "linux", "macos"] as const;
export type DesktopOS = typeof DESKTOP_OS_VALUES[number];  

export const OS_VALUES = [...MOBILE_OS_VALUES, ...DESKTOP_OS_VALUES] as const;
export type OS = typeof OS_VALUES[number];


export type DeviceKey = string;


export interface BaseDevice {
  deviceClass: DeviceClass;
  display: Display;
}


export interface GenericDevice extends BaseDevice {
  genericDeviceKey: DeviceKey;
}


export interface SpecificDevice extends BaseDevice {
  modelInfo: ModelInfo;
}


export interface StandaloneDevice extends SpecificDevice {
  operatingSystem: OperatingSystem
}


export interface ModelInfo {
  brand: string;
  modelName: string;
  yearOfRelease: number;
}


export type Device = GenericDevice | SpecificDevice | StandaloneDevice;


export interface OperatingSystem {
  name: OS,
  version: string;
  versionNickname?: string | null;
}


export interface Display {
  diagonal: number;
  resolution: Size;
  density: number;
}


export interface Size {
  width: number;
  height: number;
}

export function isGenericDevice(device: Device): device is GenericDevice {
  return (device as GenericDevice).genericDeviceKey != undefined;
}

export function isSpecificDevice(device: Device): device is SpecificDevice {
  return (device as SpecificDevice).modelInfo != undefined;
}

export function isStandaloneDevice(device: Device): device is StandaloneDevice {
  return (device as StandaloneDevice).operatingSystem != undefined;
}

export function getKey(device: Device) : DeviceKey {
  if (isGenericDevice(device)) {
    return device.genericDeviceKey
  } else if (isSpecificDevice(device)) {
    return `${device.modelInfo.brand}:${device.modelInfo.modelName}:${device.modelInfo.yearOfRelease}`
  } else {
    throw Error("Can not get key for an unknown device type");
  }
}