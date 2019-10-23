// holochain type definitions

export type Hash = string;
export type Signature = string;
export type HolochainError = object;
export type PackageRequest = object;

// holochain ambient type defs for API

/*============================================
    Holochain Ambient Type Defs for API
============================================*/

export declare function property(name: string): string;
export declare function makeHash (entryType: string, entryData: any): Hash;
export declare function debug(value: any): void;
export declare function call(zomeName: string, functionName: string, arguments: string | object): any;
export declare function bridge(appDNAHash: Hash, zomeName: string, functionName: string, arguments: string | object): any;
export declare function getBridges(): BridgeStatus[];
export declare function sign(doc: string): string;
export declare function verifySignature(signature: string, data: string, pubKey: string): boolean;
export declare function commit(entryType: string, entryData: string | object): Hash;
export declare function get(hash: Hash, options?: object): GetResponse | any;
export declare function getLinks(base: Hash, tag: string, options?: object): GetLinksResponse[];
export declare function update(entryType: string, entryData: string | object, replaces: Hash) : Hash;
export declare function updateAgent(options: object): Hash;
export declare function remove(entryHash: Hash, message: string): Hash;
export declare function query(options?: object): QueryResponse[] | any[];
export declare function send(to: Hash, message: object, options?: object): any;
export declare function bundleStart(timeout: number, userParam: any): void;
export declare function bundleClose(commit: boolean): void;

export declare var HC: HolochainSystemGlobals;
export declare var App: HolochainAppGlobals;

/*============================================
=            Holochain Data Types            =
============================================*/

export interface Header {
  Type: string;
  Time: string;
  HeaderLink: Hash;
  EntryLink: Hash;
  TypeLink: Hash;
  Sig: Signature;
  Change: Hash;
}

export interface GetResponse {
  Entry?: any;
  EntryType?: string;
  Sources?: Hash[];
}

export interface GetLinksResponse {
  Hash: Hash;
  Entry?: any;
  EntryType?: string;
  Tag?: string;
  Source?: Hash;
}

export interface QueryResponse {
  Hash?: string
  Entry?: any
  Header?: Header
}

export interface BridgeStatus {
  Side: number;
  CalleeName?: string;
  CalleeApp?: Hash;
  Token?: string;
}


/*=====  End of Holochain Data Types  ======*/


export interface HolochainSystemGlobals {
  Version: string;
  HashNotFound: any;
  Status: any;
  GetMask: any;
  LinkAction: any;
  PkgReq: any;
  Bridge: any;
  SysEntryType: any;
  BundleCancel: any;
}

export interface HolochainAppGlobals {
  Name: string;
  DNA: {
    Hash: Hash;
  };
  Key: {
    Hash: Hash;
  }
  Agent: {
    Hash: Hash;
    TopHash: Hash;
    String: string;
  }
}
