import AsyncStorage from "@react-native-async-storage/async-storage";

const STORE_KEY = "comments";

/**
 * Set the comments to ignore
 * @param {Array} comment[]
 */
export const SetCommentsToIgnore = async (comment) => {
  const jsonValue = JSON.stringify(comment);
  await AsyncStorage.setItem(STORE_KEY, jsonValue);
};

/**
 * Get the comments to ignore
 * @returns {Array} comment[]
 */
export const GetCommentsToIgnore = async () => {
  const data = await AsyncStorage.getItem(STORE_KEY);
  if (data === null) return [];
  return JSON.parse(data);
};
