export const APP_STORE_URL = "https://apps.apple.com/us/app/go-qatar/id6756709380";
export const PLAY_STORE_URL = "https://play.google.com/store/apps/details?id=com.snapinfinity.goqatar&pcampaignid=web_share";

export function getDeviceStoreLink(): string | null {
  if (typeof window === "undefined") return null;
  const ua = navigator.userAgent;
  if (/iPad|iPhone|iPod/.test(ua)) return APP_STORE_URL;
  if (/Android/.test(ua)) return PLAY_STORE_URL;
  return null;
}
