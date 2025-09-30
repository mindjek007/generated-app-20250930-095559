import { IndexedEntity } from "./core-utils";
import type { Stall, AdminUser } from "@shared/types";
import { MOCK_STALLS } from "@shared/mock-data";
export class StallEntity extends IndexedEntity<Stall> {
  static readonly entityName = "stall";
  static readonly indexName = "stalls";
  static readonly initialState: Stall = {
    id: "",
    name: "",
    cuisine: "",
    category: "",
    description: "",
    imageUrl: "",
    rating: { average: 0, count: 0 },
    menu: []
  };
  static seedData = MOCK_STALLS;
}
export class AdminUserEntity extends IndexedEntity<AdminUser> {
  static readonly entityName = "adminUser";
  static readonly indexName = "adminUsers";
  static readonly initialState: AdminUser = {
    id: "",
    username: "",
    password: "", // In a real app, this would be a hashed password
  };
  static seedData: AdminUser[] = [
    {
      id: 'default-admin',
      username: 'admin',
      password: 'password', // Plain text for simplicity in this demo
    }
  ];
}