/* eslint-disable */
import * as Router from 'expo-router';

export * from 'expo-router';

declare module 'expo-router' {
  export namespace ExpoRouter {
    export interface __routes<T extends string = string> extends Record<string, unknown> {
      StaticRoutes: `/` | `/_sitemap` | `/canteens` | `/canteens/(tabs)` | `/canteens/(tabs)/analytics` | `/canteens/(tabs)/home` | `/canteens/(tabs)/menu` | `/canteens/(tabs)/settings` | `/canteens/analytics` | `/canteens/auth/login` | `/canteens/auth/signup` | `/canteens/home` | `/canteens/menu` | `/canteens/onboarding` | `/canteens/settings` | `/canteens/settings/passwordupdate` | `/canteens/settings/profileupdate` | `/users` | `/users/(tabs)` | `/users/(tabs)/home` | `/users/(tabs)/myorders` | `/users/(tabs)/settings` | `/users/auth/login` | `/users/auth/signup` | `/users/checkout` | `/users/home` | `/users/myorders` | `/users/onboarding` | `/users/scanner` | `/users/settings` | `/users/settings/passwordupdate` | `/users/settings/profileupdate`;
      DynamicRoutes: `/canteens/detail/${Router.SingleRoutePart<T>}`;
      DynamicRouteTemplate: `/canteens/detail/[canteenId]`;
    }
  }
}
