/**
 * @license React
 * react-reconciler.development.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

'use strict';

if (process.env.NODE_ENV !== "production") {
  module.exports = function $$$reconciler($$$hostConfig) {
    var exports = {};
'use strict';

var React = require('react');
var Scheduler = require('scheduler');

var ReactSharedInternals = React.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED;

var assign = Object.assign;

/**
 * `ReactInstanceMap` maintains a mapping from a public facing stateful
 * instance (key) and the internal representation (value). This allows public
 * methods to accept the user facing instance as an argument and map them back
 * to internal methods.
 *
 * Note that this module is currently shared and assumed to be stateless.
 * If this becomes an actual Map, that will break.
 */
function get(key) {
  return key._reactInternals;
}
function set(key, value) {
  key._reactInternals = value;
}

// -----------------------------------------------------------------------------
// Slated for removal in the future (significant effort)
//
// These are experiments that didn't work out, and never shipped, but we can't
// delete from the codebase until we migrate internal callers.
// -----------------------------------------------------------------------------
// Add a callback property to suspense to notify which promises are currently
// in the update queue. This allows reporting and tracing of what is causing
// the user to see a loading state.
//
// Also allows hydration callbacks to fire when a dehydrated boundary gets
// hydrated or deleted.
//
// This will eventually be replaced by the Transition Tracing proposal.

var enableSuspenseCallback = false; // Experimental Scope support.

var enableLazyContextPropagation = false; // FB-only usage. The new API has different semantics.

var enableLegacyHidden = false; // Enables unstable_avoidThisFallback feature in Fiber
var enableHostSingletons = true;
// Chopping Block
//
// Planned feature deprecations and breaking changes. Sorted roughly in order of
// when we plan to enable them.
// -----------------------------------------------------------------------------
// This flag enables Strict Effects by default. We're not turning this on until
// after 18 because it requires migration work. Recommendation is to use
// <StrictMode /> to gradually upgrade components.
// If TRUE, trees rendered with createRoot will be StrictEffectsMode.
// If FALSE, these trees will be StrictLegacyMode.

var createRootStrictEffectsByDefault = false;
// Debugging and DevTools
// -----------------------------------------------------------------------------
// Adds user timing marks for e.g. state updates, suspense, and work loop stuff,
// for an experimental timeline tool.

var enableSchedulingProfiler = true; // Helps identify side effects in render-phase lifecycle hooks and setState

var enableProfilerTimer = true; // Record durations for commit and passive effects phases.

var enableProfilerCommitHooks = true; // Phase param passed to onRender callback differentiates between an "update" and a "cascading-update".

var enableProfilerNestedUpdatePhase = true; // Adds verbose console logging for e.g. state updates, suspense, and work loop

var FunctionComponent = 0;
var ClassComponent = 1;
var IndeterminateComponent = 2; // Before we know whether it is function or class

var HostRoot = 3; // Root of a host tree. Could be nested inside another node.

var HostPortal = 4; // A subtree. Could be an entry point to a different renderer.

var HostComponent = 5;
var HostText = 6;
var Fragment = 7;
var Mode = 8;
var ContextConsumer = 9;
var ContextProvider = 10;
var ForwardRef = 11;
var Profiler = 12;
var SuspenseComponent = 13;
var MemoComponent = 14;
var SimpleMemoComponent = 15;
var LazyComponent = 16;
var IncompleteClassComponent = 17;
var DehydratedFragment = 18;
var SuspenseListComponent = 19;
var ScopeComponent = 21;
var OffscreenComponent = 22;
var LegacyHiddenComponent = 23;
var CacheComponent = 24;
var TracingMarkerComponent = 25;
var HostResource = 26;
var HostSingleton = 27;

// ATTENTION
// When adding new symbols to this file,
// Please consider also adding to 'react-devtools-shared/src/backend/ReactSymbols'
// The Symbol used to tag the ReactElement-like types.
var REACT_ELEMENT_TYPE = Symbol.for('react.element');
var REACT_PORTAL_TYPE = Symbol.for('react.portal');
var REACT_FRAGMENT_TYPE = Symbol.for('react.fragment');
var REACT_STRICT_MODE_TYPE = Symbol.for('react.strict_mode');
var REACT_PROFILER_TYPE = Symbol.for('react.profiler');
var REACT_PROVIDER_TYPE = Symbol.for('react.provider');
var REACT_CONTEXT_TYPE = Symbol.for('react.context');
var REACT_SERVER_CONTEXT_TYPE = Symbol.for('react.server_context');
var REACT_FORWARD_REF_TYPE = Symbol.for('react.forward_ref');
var REACT_SUSPENSE_TYPE = Symbol.for('react.suspense');
var REACT_SUSPENSE_LIST_TYPE = Symbol.for('react.suspense_list');
var REACT_MEMO_TYPE = Symbol.for('react.memo');
var REACT_LAZY_TYPE = Symbol.for('react.lazy');
var REACT_SCOPE_TYPE = Symbol.for('react.scope');
var REACT_DEBUG_TRACING_MODE_TYPE = Symbol.for('react.debug_trace_mode');
var REACT_OFFSCREEN_TYPE = Symbol.for('react.offscreen');
var REACT_LEGACY_HIDDEN_TYPE = Symbol.for('react.legacy_hidden');
var REACT_CACHE_TYPE = Symbol.for('react.cache');
var REACT_TRACING_MARKER_TYPE = Symbol.for('react.tracing_marker');
var REACT_SERVER_CONTEXT_DEFAULT_VALUE_NOT_LOADED = Symbol.for('react.default_value');
var REACT_MEMO_CACHE_SENTINEL = Symbol.for('react.memo_cache_sentinel');
var MAYBE_ITERATOR_SYMBOL = Symbol.iterator;
var FAUX_ITERATOR_SYMBOL = '@@iterator';
function getIteratorFn(maybeIterable) {
  if (maybeIterable === null || typeof maybeIterable !== 'object') {
    return null;
  }

  var maybeIterator = MAYBE_ITERATOR_SYMBOL && maybeIterable[MAYBE_ITERATOR_SYMBOL] || maybeIterable[FAUX_ITERATOR_SYMBOL];

  if (typeof maybeIterator === 'function') {
    return maybeIterator;
  }

  return null;
}

function getWrappedName(outerType, innerType, wrapperName) {
  var displayName = outerType.displayName;

  if (displayName) {
    return displayName;
  }

  var functionName = innerType.displayName || innerType.name || '';
  return functionName !== '' ? wrapperName + "(" + functionName + ")" : wrapperName;
} // Keep in sync with react-reconciler/getComponentNameFromFiber


function getContextName(type) {
  return type.displayName || 'Context';
} // Note that the reconciler package should generally prefer to use getComponentNameFromFiber() instead.


function getComponentNameFromType(type) {
  if (type == null) {
    // Host root, text node or just invalid type.
    return null;
  }

  if (typeof type === 'function') {
    return type.displayName || type.name || null;
  }

  if (typeof type === 'string') {
    return type;
  }

  switch (type) {
    case REACT_FRAGMENT_TYPE:
      return 'Fragment';

    case REACT_PORTAL_TYPE:
      return 'Portal';

    case REACT_PROFILER_TYPE:
      return 'Profiler';

    case REACT_STRICT_MODE_TYPE:
      return 'StrictMode';

    case REACT_SUSPENSE_TYPE:
      return 'Suspense';

    case REACT_SUSPENSE_LIST_TYPE:
      return 'SuspenseList';

    case REACT_CACHE_TYPE:
      {
        return 'Cache';
      }

  }

  if (typeof type === 'object') {
    switch (type.$$typeof) {
      case REACT_CONTEXT_TYPE:
        var context = type;
        return getContextName(context) + '.Consumer';

      case REACT_PROVIDER_TYPE:
        var provider = type;
        return getContextName(provider._context) + '.Provider';

      case REACT_FORWARD_REF_TYPE:
        return getWrappedName(type, type.render, 'ForwardRef');

      case REACT_MEMO_TYPE:
        var outerName = type.displayName || null;

        if (outerName !== null) {
          return outerName;
        }

        return getComponentNameFromType(type.type) || 'Memo';

      case REACT_LAZY_TYPE:
        {
          var lazyComponent = type;
          var payload = lazyComponent._payload;
          var init = lazyComponent._init;

          try {
            return getComponentNameFromType(init(payload));
          } catch (x) {
            return null;
          }
        }

      case REACT_SERVER_CONTEXT_TYPE:
        {
          var context2 = type;
          return (context2.displayName || context2._globalName) + '.Provider';
        }

      // eslint-disable-next-line no-fallthrough
    }
  }

  return null;
}

function getWrappedName$1(outerType, innerType, wrapperName) {
  var functionName = innerType.displayName || innerType.name || '';
  return outerType.displayName || (functionName !== '' ? wrapperName + "(" + functionName + ")" : wrapperName);
} // Keep in sync with shared/getComponentNameFromType


function getContextName$1(type) {
  return type.displayName || 'Context';
}

function getComponentNameFromFiber(fiber) {
  var tag = fiber.tag,
      type = fiber.type;

  switch (tag) {
    case CacheComponent:
      return 'Cache';

    case ContextConsumer:
      var context = type;
      return getContextName$1(context) + '.Consumer';

    case ContextProvider:
      var provider = type;
      return getContextName$1(provider._context) + '.Provider';

    case DehydratedFragment:
      return 'DehydratedFragment';

    case ForwardRef:
      return getWrappedName$1(type, type.render, 'ForwardRef');

    case Fragment:
      return 'Fragment';

    case HostResource:
    case HostSingleton:
    case HostComponent:
      // Host component type is the display name (e.g. "div", "View")
      return type;

    case HostPortal:
      return 'Portal';

    case HostRoot:
      return 'Root';

    case HostText:
      return 'Text';

    case LazyComponent:
      // Name comes from the type in this case; we don't have a tag.
      return getComponentNameFromType(type);

    case Mode:
      if (type === REACT_STRICT_MODE_TYPE) {
        // Don't be less specific than shared/getComponentNameFromType
        return 'StrictMode';
      }

      return 'Mode';

    case OffscreenComponent:
      return 'Offscreen';

    case Profiler:
      return 'Profiler';

    case ScopeComponent:
      return 'Scope';

    case SuspenseComponent:
      return 'Suspense';

    case SuspenseListComponent:
      return 'SuspenseList';

    case TracingMarkerComponent:
      return 'TracingMarker';
    // The display name for this tags come from the user-provided type:

    case ClassComponent:
    case FunctionComponent:
    case IncompleteClassComponent:
    case IndeterminateComponent:
    case MemoComponent:
    case SimpleMemoComponent:
      if (typeof type === 'function') {
        return type.displayName || type.name || null;
      }

      if (typeof type === 'string') {
        return type;
      }

      break;

  }

  return null;
}

var NoFlags =
/*                      */
0;
var PerformedWork =
/*                */
1;
var Placement =
/*                    */
2;
var DidCapture =
/*                   */
128;
var Hydrating =
/*                    */
4096; // You can change the rest (and add more).

var Update =
/*                       */
4;
/* Skipped value:                                 0b000000000000000000000001000; */

var ChildDeletion =
/*                */
16;
var ContentReset =
/*                 */
32;
var Callback =
/*                     */
64;
/* Used by DidCapture:                            0b000000000000000000010000000; */

var ForceClientRender =
/*            */
256;
var Ref =
/*                          */
512;
var Snapshot =
/*                     */
1024;
var Passive =
/*                      */
2048;
/* Used by Hydrating:                             0b000000000000001000000000000; */

var Visibility =
/*                   */
8192;
var StoreConsistency =
/*             */
16384;
var LifecycleEffectMask = Passive | Update | Callback | Ref | Snapshot | StoreConsistency; // Union of all commit flags (flags with the lifetime of a particular commit)

var HostEffectMask =
/*               */
16383; // These are not really side effects, but we still reuse this field.

var Incomplete =
/*                   */
32768;
var ShouldCapture =
/*                */
65536;
var ForceUpdateForLegacySuspense =
/* */
131072;
var Forked =
/*                       */
1048576; // Static tags describe aspects of a fiber that are not specific to a render,
// e.g. a fiber uses a passive effect (even if there are no updates on this particular render).
// This enables us to defer more work in the unmount case,
// since we can defer traversing the tree during layout to look for Passive effects,
// and instead rely on the static flag as a signal that there may be cleanup work.

var RefStatic =
/*                    */
2097152;
var LayoutStatic =
/*                 */
4194304;
var PassiveStatic =
/*                */
8388608; // Flag used to identify newly inserted fibers. It isn't reset after commit unlike `Placement`.

var PlacementDEV =
/*                 */
16777216;
// don't contain effects, by checking subtreeFlags.

var BeforeMutationMask = // TODO: Remove Update flag from before mutation phase by re-landing Visibility
// flag logic (see #20043)
Update | Snapshot | ( 0);
var MutationMask = Placement | Update | ChildDeletion | ContentReset | Ref | Hydrating | Visibility;
var LayoutMask = Update | Callback | Ref | Visibility; // TODO: Split into PassiveMountMask and PassiveUnmountMask

var PassiveMask = Passive | Visibility | ChildDeletion; // Union of tags that don't get reset on clones.
// This allows certain concepts to persist without recalculating them,
// e.g. whether a subtree contains passive effects or portals.

var StaticMask = LayoutStatic | PassiveStatic | RefStatic;

var ReactCurrentOwner = ReactSharedInternals.ReactCurrentOwner;
function getNearestMountedFiber(fiber) {
  var node = fiber;
  var nearestMounted = fiber;

  if (!fiber.alternate) {
    // If there is no alternate, this might be a new tree that isn't inserted
    // yet. If it is, then it will have a pending insertion effect on it.
    var nextNode = node;

    do {
      node = nextNode;

      if ((node.flags & (Placement | Hydrating)) !== NoFlags) {
        // This is an insertion or in-progress hydration. The nearest possible
        // mounted fiber is the parent but we need to continue to figure out
        // if that one is still mounted.
        nearestMounted = node.return;
      } // $FlowFixMe[incompatible-type] we bail out when we get a null


      nextNode = node.return;
    } while (nextNode);
  } else {
    while (node.return) {
      node = node.return;
    }
  }

  if (node.tag === HostRoot) {
    // TODO: Check if this was a nested HostRoot when used with
    // renderContainerIntoSubtree.
    return nearestMounted;
  } // If we didn't hit the root, that means that we're in an disconnected tree
  // that has been unmounted.


  return null;
}
function isFiberMounted(fiber) {
  return getNearestMountedFiber(fiber) === fiber;
}
function isMounted(component) {

  var fiber = get(component);

  if (!fiber) {
    return false;
  }

  return getNearestMountedFiber(fiber) === fiber;
}

function assertIsMounted(fiber) {
  if (getNearestMountedFiber(fiber) !== fiber) {
    throw new Error('Unable to find node on an unmounted component.');
  }
}

function findCurrentFiberUsingSlowPath(fiber) {
  var alternate = fiber.alternate;

  if (!alternate) {
    // If there is no alternate, then we only need to check if it is mounted.
    var nearestMounted = getNearestMountedFiber(fiber);

    if (nearestMounted === null) {
      throw new Error('Unable to find node on an unmounted component.');
    }

    if (nearestMounted !== fiber) {
      return null;
    }

    return fiber;
  } // If we have two possible branches, we'll walk backwards up to the root
  // to see what path the root points to. On the way we may hit one of the
  // special cases and we'll deal with them.


  var a = fiber;
  var b = alternate;

  while (true) {
    var parentA = a.return;

    if (parentA === null) {
      // We're at the root.
      break;
    }

    var parentB = parentA.alternate;

    if (parentB === null) {
      // There is no alternate. This is an unusual case. Currently, it only
      // happens when a Suspense component is hidden. An extra fragment fiber
      // is inserted in between the Suspense fiber and its children. Skip
      // over this extra fragment fiber and proceed to the next parent.
      var nextParent = parentA.return;

      if (nextParent !== null) {
        a = b = nextParent;
        continue;
      } // If there's no parent, we're at the root.


      break;
    } // If both copies of the parent fiber point to the same child, we can
    // assume that the child is current. This happens when we bailout on low
    // priority: the bailed out fiber's child reuses the current child.


    if (parentA.child === parentB.child) {
      var child = parentA.child;

      while (child) {
        if (child === a) {
          // We've determined that A is the current branch.
          assertIsMounted(parentA);
          return fiber;
        }

        if (child === b) {
          // We've determined that B is the current branch.
          assertIsMounted(parentA);
          return alternate;
        }

        child = child.sibling;
      } // We should never have an alternate for any mounting node. So the only
      // way this could possibly happen is if this was unmounted, if at all.


      throw new Error('Unable to find node on an unmounted component.');
    }

    if (a.return !== b.return) {
      // The return pointer of A and the return pointer of B point to different
      // fibers. We assume that return pointers never criss-cross, so A must
      // belong to the child set of A.return, and B must belong to the child
      // set of B.return.
      a = parentA;
      b = parentB;
    } else {
      // The return pointers point to the same fiber. We'll have to use the
      // default, slow path: scan the child sets of each parent alternate to see
      // which child belongs to which set.
      //
      // Search parent A's child set
      var didFindChild = false;
      var _child = parentA.child;

      while (_child) {
        if (_child === a) {
          didFindChild = true;
          a = parentA;
          b = parentB;
          break;
        }

        if (_child === b) {
          didFindChild = true;
          b = parentA;
          a = parentB;
          break;
        }

        _child = _child.sibling;
      }

      if (!didFindChild) {
        // Search parent B's child set
        _child = parentB.child;

        while (_child) {
          if (_child === a) {
            didFindChild = true;
            a = parentB;
            b = parentA;
            break;
          }

          if (_child === b) {
            didFindChild = true;
            b = parentB;
            a = parentA;
            break;
          }

          _child = _child.sibling;
        }

        if (!didFindChild) {
          throw new Error('Child was not found in either parent set. This indicates a bug ' + 'in React related to the return pointer. Please file an issue.');
        }
      }
    }

    if (a.alternate !== b) {
      throw new Error("Return fibers should always be each others' alternates. " + 'This error is likely caused by a bug in React. Please file an issue.');
    }
  } // If the root is not a host container, we're in a disconnected tree. I.e.
  // unmounted.


  if (a.tag !== HostRoot) {
    throw new Error('Unable to find node on an unmounted component.');
  }

  if (a.stateNode.current === a) {
    // We've determined that A is the current branch.
    return fiber;
  } // Otherwise B has to be current branch.


  return alternate;
}
function findCurrentHostFiber(parent) {
  var currentParent = findCurrentFiberUsingSlowPath(parent);
  return currentParent !== null ? findCurrentHostFiberImpl(currentParent) : null;
}

function findCurrentHostFiberImpl(node) {
  // Next we'll drill down this component to find the first HostComponent/Text.
  var tag = node.tag;

  if (tag === HostComponent || ( tag === HostResource ) || ( tag === HostSingleton ) || tag === HostText) {
    return node;
  }

  var child = node.child;

  while (child !== null) {
    var match = findCurrentHostFiberImpl(child);

    if (match !== null) {
      return match;
    }

    child = child.sibling;
  }

  return null;
}

function findCurrentHostFiberWithNoPortals(parent) {
  var currentParent = findCurrentFiberUsingSlowPath(parent);
  return currentParent !== null ? findCurrentHostFiberWithNoPortalsImpl(currentParent) : null;
}

function findCurrentHostFiberWithNoPortalsImpl(node) {
  // Next we'll drill down this component to find the first HostComponent/Text.
  var tag = node.tag;

  if (tag === HostComponent || ( tag === HostResource ) || ( tag === HostSingleton ) || tag === HostText) {
    return node;
  }

  var child = node.child;

  while (child !== null) {
    if (child.tag !== HostPortal) {
      var match = findCurrentHostFiberWithNoPortalsImpl(child);

      if (match !== null) {
        return match;
      }
    }

    child = child.sibling;
  }

  return null;
}

var isArrayImpl = Array.isArray; // eslint-disable-next-line no-redeclare

function isArray(a) {
  return isArrayImpl(a);
}

// This is a host config that's used for the `react-reconciler` package on npm.
// It is only used by third-party renderers.
//
// Its API lets you pass the host config as an argument.
// However, inside the `react-reconciler` we treat host config as a module.
// This file is a shim between two worlds.
//
// It works because the `react-reconciler` bundle is wrapped in something like:
//
// module.exports = function ($$$config) {
//   /* reconciler code */
// }
//
// So `$$$config` looks like a global variable, but it's
// really an argument to a top-level wrapping function.
// eslint-disable-line no-undef
// eslint-disable-line no-undef
// eslint-disable-line no-undef
// eslint-disable-line no-undef
// eslint-disable-line no-undef
// eslint-disable-line no-undef
// eslint-disable-line no-undef
// eslint-disable-line no-undef
// eslint-disable-line no-undef
// eslint-disable-line no-undef
// eslint-disable-line no-undef
// eslint-disable-line no-undef
// eslint-disable-line no-undef
// eslint-disable-line no-undef
var getPublicInstance = $$$hostConfig.getPublicInstance;
var getRootHostContext = $$$hostConfig.getRootHostContext;
var getChildHostContext = $$$hostConfig.getChildHostContext;
var prepareForCommit = $$$hostConfig.prepareForCommit;
var resetAfterCommit = $$$hostConfig.resetAfterCommit;
var createInstance = $$$hostConfig.createInstance;
var appendInitialChild = $$$hostConfig.appendInitialChild;
var finalizeInitialChildren = $$$hostConfig.finalizeInitialChildren;
var prepareUpdate = $$$hostConfig.prepareUpdate;
var shouldSetTextContent = $$$hostConfig.shouldSetTextContent;
var createTextInstance = $$$hostConfig.createTextInstance;
var scheduleTimeout = $$$hostConfig.scheduleTimeout;
var cancelTimeout = $$$hostConfig.cancelTimeout;
var noTimeout = $$$hostConfig.noTimeout;
var isPrimaryRenderer = $$$hostConfig.isPrimaryRenderer;
var warnsIfNotActing = $$$hostConfig.warnsIfNotActing;
var supportsMutation = $$$hostConfig.supportsMutation;
var supportsPersistence = $$$hostConfig.supportsPersistence;
var supportsHydration = $$$hostConfig.supportsHydration;
var getInstanceFromNode = $$$hostConfig.getInstanceFromNode;
var beforeActiveInstanceBlur = $$$hostConfig.beforeActiveInstanceBlur;
var afterActiveInstanceBlur = $$$hostConfig.afterActiveInstanceBlur;
var preparePortalMount = $$$hostConfig.preparePortalMount;
var prepareScopeUpdate = $$$hostConfig.prepareScopeUpdate;
var getInstanceFromScope = $$$hostConfig.getInstanceFromScope;
var getCurrentEventPriority = $$$hostConfig.getCurrentEventPriority;
var detachDeletedInstance = $$$hostConfig.detachDeletedInstance;
var requestPostPaintCallback = $$$hostConfig.requestPostPaintCallback;
var prepareRendererToRender = $$$hostConfig.prepareRendererToRender;
var resetRendererAfterRender = $$$hostConfig.resetRendererAfterRender; // -------------------
//      Microtasks
//     (optional)
// -------------------

var supportsMicrotasks = $$$hostConfig.supportsMicrotasks;
var scheduleMicrotask = $$$hostConfig.scheduleMicrotask; // -------------------
//      Test selectors
//     (optional)
// -------------------

var supportsTestSelectors = $$$hostConfig.supportsTestSelectors;
var findFiberRoot = $$$hostConfig.findFiberRoot;
var getBoundingRect = $$$hostConfig.getBoundingRect;
var getTextContent = $$$hostConfig.getTextContent;
var isHiddenSubtree = $$$hostConfig.isHiddenSubtree;
var matchAccessibilityRole = $$$hostConfig.matchAccessibilityRole;
var setFocusIfFocusable = $$$hostConfig.setFocusIfFocusable;
var setupIntersectionObserver = $$$hostConfig.setupIntersectionObserver; // -------------------
//      Mutation
//     (optional)
// -------------------

var appendChild = $$$hostConfig.appendChild;
var appendChildToContainer = $$$hostConfig.appendChildToContainer;
var commitTextUpdate = $$$hostConfig.commitTextUpdate;
var commitMount = $$$hostConfig.commitMount;
var commitUpdate = $$$hostConfig.commitUpdate;
var insertBefore = $$$hostConfig.insertBefore;
var insertInContainerBefore = $$$hostConfig.insertInContainerBefore;
var removeChild = $$$hostConfig.removeChild;
var removeChildFromContainer = $$$hostConfig.removeChildFromContainer;
var resetTextContent = $$$hostConfig.resetTextContent;
var hideInstance = $$$hostConfig.hideInstance;
var hideTextInstance = $$$hostConfig.hideTextInstance;
var unhideInstance = $$$hostConfig.unhideInstance;
var unhideTextInstance = $$$hostConfig.unhideTextInstance;
var clearContainer = $$$hostConfig.clearContainer; // -------------------
//     Persistence
//     (optional)
// -------------------

var cloneInstance = $$$hostConfig.cloneInstance;
var createContainerChildSet = $$$hostConfig.createContainerChildSet;
var appendChildToContainerChildSet = $$$hostConfig.appendChildToContainerChildSet;
var finalizeContainerChildren = $$$hostConfig.finalizeContainerChildren;
var replaceContainerChildren = $$$hostConfig.replaceContainerChildren;
var cloneHiddenInstance = $$$hostConfig.cloneHiddenInstance;
var cloneHiddenTextInstance = $$$hostConfig.cloneHiddenTextInstance; // -------------------
//     Hydration
//     (optional)
// -------------------

var isHydratable = $$$hostConfig.isHydratable;
var canHydrateInstance = $$$hostConfig.canHydrateInstance;
var canHydrateTextInstance = $$$hostConfig.canHydrateTextInstance;
var canHydrateSuspenseInstance = $$$hostConfig.canHydrateSuspenseInstance;
var isSuspenseInstancePending = $$$hostConfig.isSuspenseInstancePending;
var isSuspenseInstanceFallback = $$$hostConfig.isSuspenseInstanceFallback;
var getSuspenseInstanceFallbackErrorDetails = $$$hostConfig.getSuspenseInstanceFallbackErrorDetails;
var registerSuspenseInstanceRetry = $$$hostConfig.registerSuspenseInstanceRetry;
var getNextHydratableSibling = $$$hostConfig.getNextHydratableSibling;
var getFirstHydratableChild = $$$hostConfig.getFirstHydratableChild;
var getFirstHydratableChildWithinContainer = $$$hostConfig.getFirstHydratableChildWithinContainer;
var getFirstHydratableChildWithinSuspenseInstance = $$$hostConfig.getFirstHydratableChildWithinSuspenseInstance;
var hydrateInstance = $$$hostConfig.hydrateInstance;
var hydrateTextInstance = $$$hostConfig.hydrateTextInstance;
var hydrateSuspenseInstance = $$$hostConfig.hydrateSuspenseInstance;
var getNextHydratableInstanceAfterSuspenseInstance = $$$hostConfig.getNextHydratableInstanceAfterSuspenseInstance;
var commitHydratedContainer = $$$hostConfig.commitHydratedContainer;
var commitHydratedSuspenseInstance = $$$hostConfig.commitHydratedSuspenseInstance;
var clearSuspenseBoundary = $$$hostConfig.clearSuspenseBoundary;
var clearSuspenseBoundaryFromContainer = $$$hostConfig.clearSuspenseBoundaryFromContainer;
var shouldDeleteUnhydratedTailInstances = $$$hostConfig.shouldDeleteUnhydratedTailInstances;
var didNotMatchHydratedContainerTextInstance = $$$hostConfig.didNotMatchHydratedContainerTextInstance;
var didNotMatchHydratedTextInstance = $$$hostConfig.didNotMatchHydratedTextInstance;
var didNotHydrateInstanceWithinContainer = $$$hostConfig.didNotHydrateInstanceWithinContainer;
var didNotHydrateInstanceWithinSuspenseInstance = $$$hostConfig.didNotHydrateInstanceWithinSuspenseInstance;
var didNotHydrateInstance = $$$hostConfig.didNotHydrateInstance;
var didNotFindHydratableInstanceWithinContainer = $$$hostConfig.didNotFindHydratableInstanceWithinContainer;
var didNotFindHydratableTextInstanceWithinContainer = $$$hostConfig.didNotFindHydratableTextInstanceWithinContainer;
var didNotFindHydratableSuspenseInstanceWithinContainer = $$$hostConfig.didNotFindHydratableSuspenseInstanceWithinContainer;
var didNotFindHydratableInstanceWithinSuspenseInstance = $$$hostConfig.didNotFindHydratableInstanceWithinSuspenseInstance;
var didNotFindHydratableTextInstanceWithinSuspenseInstance = $$$hostConfig.didNotFindHydratableTextInstanceWithinSuspenseInstance;
var didNotFindHydratableSuspenseInstanceWithinSuspenseInstance = $$$hostConfig.didNotFindHydratableSuspenseInstanceWithinSuspenseInstance;
var didNotFindHydratableInstance = $$$hostConfig.didNotFindHydratableInstance;
var didNotFindHydratableTextInstance = $$$hostConfig.didNotFindHydratableTextInstance;
var didNotFindHydratableSuspenseInstance = $$$hostConfig.didNotFindHydratableSuspenseInstance;
var errorHydratingContainer = $$$hostConfig.errorHydratingContainer; // -------------------
//     Resources
//     (optional)
// -------------------

var supportsResources = $$$hostConfig.supportsResources;
var isHostResourceType = $$$hostConfig.isHostResourceType;
var getResource = $$$hostConfig.getResource;
var acquireResource = $$$hostConfig.acquireResource;
var releaseResource = $$$hostConfig.releaseResource; // -------------------
//     Singletons
//     (optional)
// -------------------

var supportsSingletons = $$$hostConfig.supportsSingletons;
var resolveSingletonInstance = $$$hostConfig.resolveSingletonInstance;
var clearSingleton = $$$hostConfig.clearSingleton;
var acquireSingletonInstance = $$$hostConfig.acquireSingletonInstance;
var releaseSingletonInstance = $$$hostConfig.releaseSingletonInstance;
var isHostSingletonType = $$$hostConfig.isHostSingletonType;

var ReactCurrentDispatcher = ReactSharedInternals.ReactCurrentDispatcher;
var prefix;
function describeBuiltInComponentFrame(name, source, ownerFn) {
  {
    if (prefix === undefined) {
      // Extract the VM specific prefix used by each line.
      try {
        throw Error();
      } catch (x) {
        var match = x.stack.trim().match(/\n( *(at )?)/);
        prefix = match && match[1] || '';
      }
    } // We use the prefix to ensure our stacks line up with native stack frames.


    return '\n' + prefix + name;
  }
}
var reentry = false;

function describeNativeComponentFrame(fn, construct) {
  // If something asked for a stack inside a fake render, it should get ignored.
  if ( !fn || reentry) {
    return '';
  }

  var control;
  reentry = true;
  var previousPrepareStackTrace = Error.prepareStackTrace; // $FlowFixMe It does accept undefined.

  Error.prepareStackTrace = undefined;

  try {
    // This should throw.
    if (construct) {
      // Something should be setting the props in the constructor.
      var Fake = function () {
        throw Error();
      }; // $FlowFixMe


      Object.defineProperty(Fake.prototype, 'props', {
        set: function () {
          // We use a throwing setter instead of frozen or non-writable props
          // because that won't throw in a non-strict mode function.
          throw Error();
        }
      });

      if (typeof Reflect === 'object' && Reflect.construct) {
        // We construct a different control for this case to include any extra
        // frames added by the construct call.
        try {
          Reflect.construct(Fake, []);
        } catch (x) {
          control = x;
        }

        Reflect.construct(fn, [], Fake);
      } else {
        try {
          Fake.call();
        } catch (x) {
          control = x;
        } // $FlowFixMe[prop-missing] found when upgrading Flow


        fn.call(Fake.prototype);
      }
    } else {
      try {
        throw Error();
      } catch (x) {
        control = x;
      } // TODO(luna): This will currently only throw if the function component
      // tries to access React/ReactDOM/props. We should probably make this throw
      // in simple components too


      fn();
    }
  } catch (sample) {
    // This is inlined manually because closure doesn't do it for us.
    if (sample && control && typeof sample.stack === 'string') {
      // This extracts the first frame from the sample that isn't also in the control.
      // Skipping one frame that we assume is the frame that calls the two.
      var sampleLines = sample.stack.split('\n');
      var controlLines = control.stack.split('\n');
      var s = sampleLines.length - 1;
      var c = controlLines.length - 1;

      while (s >= 1 && c >= 0 && sampleLines[s] !== controlLines[c]) {
        // We expect at least one stack frame to be shared.
        // Typically this will be the root most one. However, stack frames may be
        // cut off due to maximum stack limits. In this case, one maybe cut off
        // earlier than the other. We assume that the sample is longer or the same
        // and there for cut off earlier. So we should find the root most frame in
        // the sample somewhere in the control.
        c--;
      }

      for (; s >= 1 && c >= 0; s--, c--) {
        // Next we find the first one that isn't the same which should be the
        // frame that called our sample function and the control.
        if (sampleLines[s] !== controlLines[c]) {
          // In V8, the first line is describing the message but other VMs don't.
          // If we're about to return the first line, and the control is also on the same
          // line, that's a pretty good indicator that our sample threw at same line as
          // the control. I.e. before we entered the sample frame. So we ignore this result.
          // This can happen if you passed a class to function component, or non-function.
          if (s !== 1 || c !== 1) {
            do {
              s--;
              c--; // We may still have similar intermediate frames from the construct call.
              // The next one that isn't the same should be our match though.

              if (c < 0 || sampleLines[s] !== controlLines[c]) {
                // V8 adds a "new" prefix for native classes. Let's remove it to make it prettier.
                var _frame = '\n' + sampleLines[s].replace(' at new ', ' at '); // If our component frame is labeled "<anonymous>"
                // but we have a user-provided "displayName"
                // splice it in to make the stack more readable.


                if (fn.displayName && _frame.includes('<anonymous>')) {
                  _frame = _frame.replace('<anonymous>', fn.displayName);
                }


                return _frame;
              }
            } while (s >= 1 && c >= 0);
          }

          break;
        }
      }
    }
  } finally {
    reentry = false;

    Error.prepareStackTrace = previousPrepareStackTrace;
  } // Fallback to just using the name if we couldn't make it throw.


  var name = fn ? fn.displayName || fn.name : '';
  var syntheticFrame = name ? describeBuiltInComponentFrame(name) : '';

  return syntheticFrame;
}

function describeClassComponentFrame(ctor, source, ownerFn) {
  {
    return describeNativeComponentFrame(ctor, true);
  }
}
function describeFunctionComponentFrame(fn, source, ownerFn) {
  {
    return describeNativeComponentFrame(fn, false);
  }
}

// $FlowFixMe[method-unbinding]
var hasOwnProperty = Object.prototype.hasOwnProperty;

var ReactDebugCurrentFrame = ReactSharedInternals.ReactDebugCurrentFrame;

var valueStack = [];

var index = -1;

function createCursor(defaultValue) {
  return {
    current: defaultValue
  };
}

function pop(cursor, fiber) {
  if (index < 0) {

    return;
  }

  cursor.current = valueStack[index];
  valueStack[index] = null;

  index--;
}

function push(cursor, value, fiber) {
  index++;
  valueStack[index] = cursor.current;

  cursor.current = value;
}

var emptyContextObject = {};


var contextStackCursor = createCursor(emptyContextObject); // A cursor to a boolean indicating whether the context has changed.

var didPerformWorkStackCursor = createCursor(false); // Keep track of the previous context object that was on the stack.
// We use this to get access to the parent context after we have already
// pushed the next context provider, and now need to merge their contexts.

var previousContext = emptyContextObject;

function getUnmaskedContext(workInProgress, Component, didPushOwnContextIfProvider) {
  {
    if (didPushOwnContextIfProvider && isContextProvider(Component)) {
      // If the fiber is a context provider itself, when we read its context
      // we may have already pushed its own child context on the stack. A context
      // provider should not "see" its own child context. Therefore we read the
      // previous (parent) context instead for a context provider.
      return previousContext;
    }

    return contextStackCursor.current;
  }
}

function cacheContext(workInProgress, unmaskedContext, maskedContext) {
  {
    var instance = workInProgress.stateNode;
    instance.__reactInternalMemoizedUnmaskedChildContext = unmaskedContext;
    instance.__reactInternalMemoizedMaskedChildContext = maskedContext;
  }
}

function getMaskedContext(workInProgress, unmaskedContext) {
  {
    var type = workInProgress.type;
    var contextTypes = type.contextTypes;

    if (!contextTypes) {
      return emptyContextObject;
    } // Avoid recreating masked context unless unmasked context has changed.
    // Failing to do this will result in unnecessary calls to componentWillReceiveProps.
    // This may trigger infinite loops if componentWillReceiveProps calls setState.


    var instance = workInProgress.stateNode;

    if (instance && instance.__reactInternalMemoizedUnmaskedChildContext === unmaskedContext) {
      return instance.__reactInternalMemoizedMaskedChildContext;
    }

    var context = {};

    for (var key in contextTypes) {
      context[key] = unmaskedContext[key];
    }
    // Context is created before the class component is instantiated so check for instance.


    if (instance) {
      cacheContext(workInProgress, unmaskedContext, context);
    }

    return context;
  }
}

function hasContextChanged() {
  {
    return didPerformWorkStackCursor.current;
  }
}

function isContextProvider(type) {
  {
    var childContextTypes = type.childContextTypes;
    return childContextTypes !== null && childContextTypes !== undefined;
  }
}

function popContext(fiber) {
  {
    pop(didPerformWorkStackCursor);
    pop(contextStackCursor);
  }
}

function popTopLevelContextObject(fiber) {
  {
    pop(didPerformWorkStackCursor);
    pop(contextStackCursor);
  }
}

function pushTopLevelContextObject(fiber, context, didChange) {
  {
    if (contextStackCursor.current !== emptyContextObject) {
      throw new Error('Unexpected context found on stack. ' + 'This error is likely caused by a bug in React. Please file an issue.');
    }

    push(contextStackCursor, context);
    push(didPerformWorkStackCursor, didChange);
  }
}

function processChildContext(fiber, type, parentContext) {
  {
    var instance = fiber.stateNode;
    var childContextTypes = type.childContextTypes; // TODO (bvaughn) Replace this behavior with an invariant() in the future.
    // It has only been added in Fiber to match the (unintentional) behavior in Stack.

    if (typeof instance.getChildContext !== 'function') {

      return parentContext;
    }

    var childContext = instance.getChildContext();

    for (var contextKey in childContext) {
      if (!(contextKey in childContextTypes)) {
        throw new Error((getComponentNameFromFiber(fiber) || 'Unknown') + ".getChildContext(): key \"" + contextKey + "\" is not defined in childContextTypes.");
      }
    }

    return assign({}, parentContext, childContext);
  }
}

function pushContextProvider(workInProgress) {
  {
    var instance = workInProgress.stateNode; // We push the context as early as possible to ensure stack integrity.
    // If the instance does not exist yet, we will push null at first,
    // and replace it on the stack later when invalidating the context.

    var memoizedMergedChildContext = instance && instance.__reactInternalMemoizedMergedChildContext || emptyContextObject; // Remember the parent context so we can merge with it later.
    // Inherit the parent's did-perform-work value to avoid inadvertently blocking updates.

    previousContext = contextStackCursor.current;
    push(contextStackCursor, memoizedMergedChildContext);
    push(didPerformWorkStackCursor, didPerformWorkStackCursor.current);
    return true;
  }
}

function invalidateContextProvider(workInProgress, type, didChange) {
  {
    var instance = workInProgress.stateNode;

    if (!instance) {
      throw new Error('Expected to have an instance by this point. ' + 'This error is likely caused by a bug in React. Please file an issue.');
    }

    if (didChange) {
      // Merge parent and own context.
      // Skip this if we're not updating due to sCU.
      // This avoids unnecessarily recomputing memoized values.
      var mergedContext = processChildContext(workInProgress, type, previousContext);
      instance.__reactInternalMemoizedMergedChildContext = mergedContext; // Replace the old (or empty) context with the new one.
      // It is important to unwind the context in the reverse order.

      pop(didPerformWorkStackCursor);
      pop(contextStackCursor); // Now push the new context and mark that it has changed.

      push(contextStackCursor, mergedContext);
      push(didPerformWorkStackCursor, didChange);
    } else {
      pop(didPerformWorkStackCursor);
      push(didPerformWorkStackCursor, didChange);
    }
  }
}

function findCurrentUnmaskedContext(fiber) {
  {
    // Currently this is only used with renderSubtreeIntoContainer; not sure if it
    // makes sense elsewhere
    if (!isFiberMounted(fiber) || fiber.tag !== ClassComponent) {
      throw new Error('Expected subtree parent to be a mounted class component. ' + 'This error is likely caused by a bug in React. Please file an issue.');
    }

    var node = fiber;

    do {
      switch (node.tag) {
        case HostRoot:
          return node.stateNode.context;

        case ClassComponent:
          {
            var Component = node.type;

            if (isContextProvider(Component)) {
              return node.stateNode.__reactInternalMemoizedMergedChildContext;
            }

            break;
          }
      } // $FlowFixMe[incompatible-type] we bail out when we get a null


      node = node.return;
    } while (node !== null);

    throw new Error('Found unexpected detached subtree parent. ' + 'This error is likely caused by a bug in React. Please file an issue.');
  }
}

var LegacyRoot = 0;
var ConcurrentRoot = 1;

// We use the existence of the state object as an indicator that the component
// is hidden.
var OffscreenVisible =
/*                     */
1;
var OffscreenDetached =
/*                    */
2;
var OffscreenPassiveEffectsConnected =
/*     */
4;
function isOffscreenManual(offscreenFiber) {
  return offscreenFiber.memoizedProps !== null && offscreenFiber.memoizedProps.mode === 'manual';
}

var NoMode =
/*                         */
0; // TODO: Remove ConcurrentMode by reading from the root tag instead

var ConcurrentMode =
/*                 */
1;
var ProfileMode =
/*                    */
2;
var StrictLegacyMode =
/*               */
8;
var StrictEffectsMode =
/*              */
16;

// TODO: This is pretty well supported by browsers. Maybe we can drop it.
var clz32 = Math.clz32 ? Math.clz32 : clz32Fallback; // Count leading zeros.
// Based on:
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/clz32

var log = Math.log;
var LN2 = Math.LN2;

function clz32Fallback(x) {
  var asUint = x >>> 0;

  if (asUint === 0) {
    return 32;
  }

  return 31 - (log(asUint) / LN2 | 0) | 0;
}

// If those values are changed that package should be rebuilt and redeployed.

var TotalLanes = 31;
var NoLanes =
/*                        */
0;
var NoLane =
/*                          */
0;
var SyncHydrationLane =
/*               */
1;
var SyncLane =
/*                        */
2;
var InputContinuousHydrationLane =
/*    */
4;
var InputContinuousLane =
/*             */
8;
var DefaultHydrationLane =
/*            */
16;
var DefaultLane =
/*                     */
32;
var SyncUpdateLanes =
/*                */
42;
var TransitionHydrationLane =
/*                */
64;
var TransitionLanes =
/*                       */
8388480;
var TransitionLane1 =
/*                        */
128;
var TransitionLane2 =
/*                        */
256;
var TransitionLane3 =
/*                        */
512;
var TransitionLane4 =
/*                        */
1024;
var TransitionLane5 =
/*                        */
2048;
var TransitionLane6 =
/*                        */
4096;
var TransitionLane7 =
/*                        */
8192;
var TransitionLane8 =
/*                        */
16384;
var TransitionLane9 =
/*                        */
32768;
var TransitionLane10 =
/*                       */
65536;
var TransitionLane11 =
/*                       */
131072;
var TransitionLane12 =
/*                       */
262144;
var TransitionLane13 =
/*                       */
524288;
var TransitionLane14 =
/*                       */
1048576;
var TransitionLane15 =
/*                       */
2097152;
var TransitionLane16 =
/*                       */
4194304;
var RetryLanes =
/*                            */
125829120;
var RetryLane1 =
/*                             */
8388608;
var RetryLane2 =
/*                             */
16777216;
var RetryLane3 =
/*                             */
33554432;
var RetryLane4 =
/*                             */
67108864;
var SomeRetryLane = RetryLane1;
var SelectiveHydrationLane =
/*          */
134217728;
var NonIdleLanes =
/*                          */
268435455;
var IdleHydrationLane =
/*               */
268435456;
var IdleLane =
/*                        */
536870912;
var OffscreenLane =
/*                   */
1073741824; // This function is used for the experimental timeline (react-devtools-timeline)
// It should be kept in sync with the Lanes values above.

function getLabelForLane(lane) {
  {
    if (lane & SyncHydrationLane) {
      return 'SyncHydrationLane';
    }

    if (lane & SyncLane) {
      return 'Sync';
    }

    if (lane & InputContinuousHydrationLane) {
      return 'InputContinuousHydration';
    }

    if (lane & InputContinuousLane) {
      return 'InputContinuous';
    }

    if (lane & DefaultHydrationLane) {
      return 'DefaultHydration';
    }

    if (lane & DefaultLane) {
      return 'Default';
    }

    if (lane & TransitionHydrationLane) {
      return 'TransitionHydration';
    }

    if (lane & TransitionLanes) {
      return 'Transition';
    }

    if (lane & RetryLanes) {
      return 'Retry';
    }

    if (lane & SelectiveHydrationLane) {
      return 'SelectiveHydration';
    }

    if (lane & IdleHydrationLane) {
      return 'IdleHydration';
    }

    if (lane & IdleLane) {
      return 'Idle';
    }

    if (lane & OffscreenLane) {
      return 'Offscreen';
    }
  }
}
var NoTimestamp = -1;
var nextTransitionLane = TransitionLane1;
var nextRetryLane = RetryLane1;

function getHighestPriorityLanes(lanes) {
  {
    var pendingSyncLanes = lanes & SyncUpdateLanes;

    if (pendingSyncLanes !== 0) {
      return pendingSyncLanes;
    }
  }

  switch (getHighestPriorityLane(lanes)) {
    case SyncHydrationLane:
      return SyncHydrationLane;

    case SyncLane:
      return SyncLane;

    case InputContinuousHydrationLane:
      return InputContinuousHydrationLane;

    case InputContinuousLane:
      return InputContinuousLane;

    case DefaultHydrationLane:
      return DefaultHydrationLane;

    case DefaultLane:
      return DefaultLane;

    case TransitionHydrationLane:
      return TransitionHydrationLane;

    case TransitionLane1:
    case TransitionLane2:
    case TransitionLane3:
    case TransitionLane4:
    case TransitionLane5:
    case TransitionLane6:
    case TransitionLane7:
    case TransitionLane8:
    case TransitionLane9:
    case TransitionLane10:
    case TransitionLane11:
    case TransitionLane12:
    case TransitionLane13:
    case TransitionLane14:
    case TransitionLane15:
    case TransitionLane16:
      return lanes & TransitionLanes;

    case RetryLane1:
    case RetryLane2:
    case RetryLane3:
    case RetryLane4:
      return lanes & RetryLanes;

    case SelectiveHydrationLane:
      return SelectiveHydrationLane;

    case IdleHydrationLane:
      return IdleHydrationLane;

    case IdleLane:
      return IdleLane;

    case OffscreenLane:
      return OffscreenLane;

    default:


      return lanes;
  }
}

function getNextLanes(root, wipLanes) {
  // Early bailout if there's no pending work left.
  var pendingLanes = root.pendingLanes;

  if (pendingLanes === NoLanes) {
    return NoLanes;
  }

  var nextLanes = NoLanes;
  var suspendedLanes = root.suspendedLanes;
  var pingedLanes = root.pingedLanes; // Do not work on any idle work until all the non-idle work has finished,
  // even if the work is suspended.

  var nonIdlePendingLanes = pendingLanes & NonIdleLanes;

  if (nonIdlePendingLanes !== NoLanes) {
    var nonIdleUnblockedLanes = nonIdlePendingLanes & ~suspendedLanes;

    if (nonIdleUnblockedLanes !== NoLanes) {
      nextLanes = getHighestPriorityLanes(nonIdleUnblockedLanes);
    } else {
      var nonIdlePingedLanes = nonIdlePendingLanes & pingedLanes;

      if (nonIdlePingedLanes !== NoLanes) {
        nextLanes = getHighestPriorityLanes(nonIdlePingedLanes);
      }
    }
  } else {
    // The only remaining work is Idle.
    var unblockedLanes = pendingLanes & ~suspendedLanes;

    if (unblockedLanes !== NoLanes) {
      nextLanes = getHighestPriorityLanes(unblockedLanes);
    } else {
      if (pingedLanes !== NoLanes) {
        nextLanes = getHighestPriorityLanes(pingedLanes);
      }
    }
  }

  if (nextLanes === NoLanes) {
    // This should only be reachable if we're suspended
    // TODO: Consider warning in this path if a fallback timer is not scheduled.
    return NoLanes;
  } // If we're already in the middle of a render, switching lanes will interrupt
  // it and we'll lose our progress. We should only do this if the new lanes are
  // higher priority.


  if (wipLanes !== NoLanes && wipLanes !== nextLanes && // If we already suspended with a delay, then interrupting is fine. Don't
  // bother waiting until the root is complete.
  (wipLanes & suspendedLanes) === NoLanes) {
    var nextLane = getHighestPriorityLane(nextLanes);
    var wipLane = getHighestPriorityLane(wipLanes);

    if ( // Tests whether the next lane is equal or lower priority than the wip
    // one. This works because the bits decrease in priority as you go left.
    nextLane >= wipLane || // Default priority updates should not interrupt transition updates. The
    // only difference between default updates and transition updates is that
    // default updates do not support refresh transitions.
    nextLane === DefaultLane && (wipLane & TransitionLanes) !== NoLanes) {
      // Keep working on the existing in-progress tree. Do not interrupt.
      return wipLanes;
    }
  }

  if ((nextLanes & InputContinuousLane) !== NoLanes) {
    // When updates are sync by default, we entangle continuous priority updates
    // and default updates, so they render in the same batch. The only reason
    // they use separate lanes is because continuous updates should interrupt
    // transitions, but default updates should not.
    nextLanes |= pendingLanes & DefaultLane;
  } // Check for entangled lanes and add them to the batch.
  //
  // A lane is said to be entangled with another when it's not allowed to render
  // in a batch that does not also include the other lane. Typically we do this
  // when multiple updates have the same source, and we only want to respond to
  // the most recent event from that source.
  //
  // Note that we apply entanglements *after* checking for partial work above.
  // This means that if a lane is entangled during an interleaved event while
  // it's already rendering, we won't interrupt it. This is intentional, since
  // entanglement is usually "best effort": we'll try our best to render the
  // lanes in the same batch, but it's not worth throwing out partially
  // completed work in order to do it.
  // TODO: Reconsider this. The counter-argument is that the partial work
  // represents an intermediate state, which we don't want to show to the user.
  // And by spending extra time finishing it, we're increasing the amount of
  // time it takes to show the final state, which is what they are actually
  // waiting for.
  //
  // For those exceptions where entanglement is semantically important, like
  // useMutableSource, we should ensure that there is no partial work at the
  // time we apply the entanglement.


  var entangledLanes = root.entangledLanes;

  if (entangledLanes !== NoLanes) {
    var entanglements = root.entanglements;
    var lanes = nextLanes & entangledLanes;

    while (lanes > 0) {
      var index = pickArbitraryLaneIndex(lanes);
      var lane = 1 << index;
      nextLanes |= entanglements[index];
      lanes &= ~lane;
    }
  }

  return nextLanes;
}
function getMostRecentEventTime(root, lanes) {
  var eventTimes = root.eventTimes;
  var mostRecentEventTime = NoTimestamp;

  while (lanes > 0) {
    var index = pickArbitraryLaneIndex(lanes);
    var lane = 1 << index;
    var eventTime = eventTimes[index];

    if (eventTime > mostRecentEventTime) {
      mostRecentEventTime = eventTime;
    }

    lanes &= ~lane;
  }

  return mostRecentEventTime;
}

function computeExpirationTime(lane, currentTime) {
  switch (lane) {
    case SyncHydrationLane:
    case SyncLane:
    case InputContinuousHydrationLane:
    case InputContinuousLane:
      // User interactions should expire slightly more quickly.
      //
      // NOTE: This is set to the corresponding constant as in Scheduler.js.
      // When we made it larger, a product metric in www regressed, suggesting
      // there's a user interaction that's being starved by a series of
      // synchronous updates. If that theory is correct, the proper solution is
      // to fix the starvation. However, this scenario supports the idea that
      // expiration times are an important safeguard when starvation
      // does happen.
      return currentTime + 250;

    case DefaultHydrationLane:
    case DefaultLane:
    case TransitionHydrationLane:
    case TransitionLane1:
    case TransitionLane2:
    case TransitionLane3:
    case TransitionLane4:
    case TransitionLane5:
    case TransitionLane6:
    case TransitionLane7:
    case TransitionLane8:
    case TransitionLane9:
    case TransitionLane10:
    case TransitionLane11:
    case TransitionLane12:
    case TransitionLane13:
    case TransitionLane14:
    case TransitionLane15:
    case TransitionLane16:
      return currentTime + 5000;

    case RetryLane1:
    case RetryLane2:
    case RetryLane3:
    case RetryLane4:
      // TODO: Retries should be allowed to expire if they are CPU bound for
      // too long, but when I made this change it caused a spike in browser
      // crashes. There must be some other underlying bug; not super urgent but
      // ideally should figure out why and fix it. Unfortunately we don't have
      // a repro for the crashes, only detected via production metrics.
      return NoTimestamp;

    case SelectiveHydrationLane:
    case IdleHydrationLane:
    case IdleLane:
    case OffscreenLane:
      // Anything idle priority or lower should never expire.
      return NoTimestamp;

    default:

      return NoTimestamp;
  }
}

function markStarvedLanesAsExpired(root, currentTime) {
  // TODO: This gets called every time we yield. We can optimize by storing
  // the earliest expiration time on the root. Then use that to quickly bail out
  // of this function.
  var pendingLanes = root.pendingLanes;
  var suspendedLanes = root.suspendedLanes;
  var pingedLanes = root.pingedLanes;
  var expirationTimes = root.expirationTimes; // Iterate through the pending lanes and check if we've reached their
  // expiration time. If so, we'll assume the update is being starved and mark
  // it as expired to force it to finish.
  //
  // We exclude retry lanes because those must always be time sliced, in order
  // to unwrap uncached promises.
  // TODO: Write a test for this

  var lanes = pendingLanes & ~RetryLanes;

  while (lanes > 0) {
    var index = pickArbitraryLaneIndex(lanes);
    var lane = 1 << index;
    var expirationTime = expirationTimes[index];

    if (expirationTime === NoTimestamp) {
      // Found a pending lane with no expiration time. If it's not suspended, or
      // if it's pinged, assume it's CPU-bound. Compute a new expiration time
      // using the current time.
      if ((lane & suspendedLanes) === NoLanes || (lane & pingedLanes) !== NoLanes) {
        // Assumes timestamps are monotonically increasing.
        expirationTimes[index] = computeExpirationTime(lane, currentTime);
      }
    } else if (expirationTime <= currentTime) {
      // This lane expired
      root.expiredLanes |= lane;
    }

    lanes &= ~lane;
  }
} // This returns the highest priority pending lanes regardless of whether they
// are suspended.

function getHighestPriorityPendingLanes(root) {
  return getHighestPriorityLanes(root.pendingLanes);
}
function getLanesToRetrySynchronouslyOnError(root, originallyAttemptedLanes) {
  if (root.errorRecoveryDisabledLanes & originallyAttemptedLanes) {
    // The error recovery mechanism is disabled until these lanes are cleared.
    return NoLanes;
  }

  var everythingButOffscreen = root.pendingLanes & ~OffscreenLane;

  if (everythingButOffscreen !== NoLanes) {
    return everythingButOffscreen;
  }

  if (everythingButOffscreen & OffscreenLane) {
    return OffscreenLane;
  }

  return NoLanes;
}
function includesSyncLane(lanes) {
  return (lanes & (SyncLane | SyncHydrationLane)) !== NoLanes;
}
function includesNonIdleWork(lanes) {
  return (lanes & NonIdleLanes) !== NoLanes;
}
function includesOnlyRetries(lanes) {
  return (lanes & RetryLanes) === lanes;
}
function includesOnlyNonUrgentLanes(lanes) {
  // TODO: Should hydration lanes be included here? This function is only
  // used in `updateDeferredValueImpl`.
  var UrgentLanes = SyncLane | InputContinuousLane | DefaultLane;
  return (lanes & UrgentLanes) === NoLanes;
}
function includesOnlyTransitions(lanes) {
  return (lanes & TransitionLanes) === lanes;
}
function includesBlockingLane(root, lanes) {

  var SyncDefaultLanes = InputContinuousHydrationLane | InputContinuousLane | DefaultHydrationLane | DefaultLane;
  return (lanes & SyncDefaultLanes) !== NoLanes;
}
function includesExpiredLane(root, lanes) {
  // This is a separate check from includesBlockingLane because a lane can
  // expire after a render has already started.
  return (lanes & root.expiredLanes) !== NoLanes;
}
function isTransitionLane(lane) {
  return (lane & TransitionLanes) !== NoLanes;
}
function claimNextTransitionLane() {
  // Cycle through the lanes, assigning each new transition to the next lane.
  // In most cases, this means every transition gets its own lane, until we
  // run out of lanes and cycle back to the beginning.
  var lane = nextTransitionLane;
  nextTransitionLane <<= 1;

  if ((nextTransitionLane & TransitionLanes) === NoLanes) {
    nextTransitionLane = TransitionLane1;
  }

  return lane;
}
function claimNextRetryLane() {
  var lane = nextRetryLane;
  nextRetryLane <<= 1;

  if ((nextRetryLane & RetryLanes) === NoLanes) {
    nextRetryLane = RetryLane1;
  }

  return lane;
}
function getHighestPriorityLane(lanes) {
  return lanes & -lanes;
}
function pickArbitraryLane(lanes) {
  // This wrapper function gets inlined. Only exists so to communicate that it
  // doesn't matter which bit is selected; you can pick any bit without
  // affecting the algorithms where its used. Here I'm using
  // getHighestPriorityLane because it requires the fewest operations.
  return getHighestPriorityLane(lanes);
}

function pickArbitraryLaneIndex(lanes) {
  return 31 - clz32(lanes);
}

function laneToIndex(lane) {
  return pickArbitraryLaneIndex(lane);
}

function includesSomeLane(a, b) {
  return (a & b) !== NoLanes;
}
function isSubsetOfLanes(set, subset) {
  return (set & subset) === subset;
}
function mergeLanes(a, b) {
  return a | b;
}
function removeLanes(set, subset) {
  return set & ~subset;
}
function intersectLanes(a, b) {
  return a & b;
} // Seems redundant, but it changes the type from a single lane (used for
// updates) to a group of lanes (used for flushing work).

function laneToLanes(lane) {
  return lane;
}
function higherPriorityLane(a, b) {
  // This works because the bit ranges decrease in priority as you go left.
  return a !== NoLane && a < b ? a : b;
}
function createLaneMap(initial) {
  // Intentionally pushing one by one.
  // https://v8.dev/blog/elements-kinds#avoid-creating-holes
  var laneMap = [];

  for (var i = 0; i < TotalLanes; i++) {
    laneMap.push(initial);
  }

  return laneMap;
}
function markRootUpdated(root, updateLane, eventTime) {
  root.pendingLanes |= updateLane; // If there are any suspended transitions, it's possible this new update
  // could unblock them. Clear the suspended lanes so that we can try rendering
  // them again.
  //
  // TODO: We really only need to unsuspend only lanes that are in the
  // `subtreeLanes` of the updated fiber, or the update lanes of the return
  // path. This would exclude suspended updates in an unrelated sibling tree,
  // since there's no way for this update to unblock it.
  //
  // We don't do this if the incoming update is idle, because we never process
  // idle updates until after all the regular updates have finished; there's no
  // way it could unblock a transition.

  if (updateLane !== IdleLane) {
    root.suspendedLanes = NoLanes;
    root.pingedLanes = NoLanes;
  }

  var eventTimes = root.eventTimes;
  var index = laneToIndex(updateLane); // We can always overwrite an existing timestamp because we prefer the most
  // recent event, and we assume time is monotonically increasing.

  eventTimes[index] = eventTime;
}
function markRootSuspended(root, suspendedLanes) {
  root.suspendedLanes |= suspendedLanes;
  root.pingedLanes &= ~suspendedLanes; // The suspended lanes are no longer CPU-bound. Clear their expiration times.

  var expirationTimes = root.expirationTimes;
  var lanes = suspendedLanes;

  while (lanes > 0) {
    var index = pickArbitraryLaneIndex(lanes);
    var lane = 1 << index;
    expirationTimes[index] = NoTimestamp;
    lanes &= ~lane;
  }
}
function markRootPinged(root, pingedLanes, eventTime) {
  root.pingedLanes |= root.suspendedLanes & pingedLanes;
}
function markRootFinished(root, remainingLanes) {
  var noLongerPendingLanes = root.pendingLanes & ~remainingLanes;
  root.pendingLanes = remainingLanes; // Let's try everything again

  root.suspendedLanes = NoLanes;
  root.pingedLanes = NoLanes;
  root.expiredLanes &= remainingLanes;
  root.mutableReadLanes &= remainingLanes;
  root.entangledLanes &= remainingLanes;
  root.errorRecoveryDisabledLanes &= remainingLanes;
  var entanglements = root.entanglements;
  var eventTimes = root.eventTimes;
  var expirationTimes = root.expirationTimes;
  var hiddenUpdates = root.hiddenUpdates; // Clear the lanes that no longer have pending work

  var lanes = noLongerPendingLanes;

  while (lanes > 0) {
    var index = pickArbitraryLaneIndex(lanes);
    var lane = 1 << index;
    entanglements[index] = NoLanes;
    eventTimes[index] = NoTimestamp;
    expirationTimes[index] = NoTimestamp;
    var hiddenUpdatesForLane = hiddenUpdates[index];

    if (hiddenUpdatesForLane !== null) {
      hiddenUpdates[index] = null; // "Hidden" updates are updates that were made to a hidden component. They
      // have special logic associated with them because they may be entangled
      // with updates that occur outside that tree. But once the outer tree
      // commits, they behave like regular updates.

      for (var i = 0; i < hiddenUpdatesForLane.length; i++) {
        var update = hiddenUpdatesForLane[i];

        if (update !== null) {
          update.lane &= ~OffscreenLane;
        }
      }
    }

    lanes &= ~lane;
  }
}
function markRootEntangled(root, entangledLanes) {
  // In addition to entangling each of the given lanes with each other, we also
  // have to consider _transitive_ entanglements. For each lane that is already
  // entangled with *any* of the given lanes, that lane is now transitively
  // entangled with *all* the given lanes.
  //
  // Translated: If C is entangled with A, then entangling A with B also
  // entangles C with B.
  //
  // If this is hard to grasp, it might help to intentionally break this
  // function and look at the tests that fail in ReactTransition-test.js. Try
  // commenting out one of the conditions below.
  var rootEntangledLanes = root.entangledLanes |= entangledLanes;
  var entanglements = root.entanglements;
  var lanes = rootEntangledLanes;

  while (lanes) {
    var index = pickArbitraryLaneIndex(lanes);
    var lane = 1 << index;

    if ( // Is this one of the newly entangled lanes?
    lane & entangledLanes | // Is this lane transitively entangled with the newly entangled lanes?
    entanglements[index] & entangledLanes) {
      entanglements[index] |= entangledLanes;
    }

    lanes &= ~lane;
  }
}
function markHiddenUpdate(root, update, lane) {
  var index = laneToIndex(lane);
  var hiddenUpdates = root.hiddenUpdates;
  var hiddenUpdatesForLane = hiddenUpdates[index];

  if (hiddenUpdatesForLane === null) {
    hiddenUpdates[index] = [update];
  } else {
    hiddenUpdatesForLane.push(update);
  }

  update.lane = lane | OffscreenLane;
}
function getBumpedLaneForHydration(root, renderLanes) {
  var renderLane = getHighestPriorityLane(renderLanes);
  var lane;

  if ( (renderLane & SyncUpdateLanes) !== NoLane) {
    lane = SyncHydrationLane;
  } else {
    switch (renderLane) {
      case SyncLane:
        lane = SyncHydrationLane;
        break;

      case InputContinuousLane:
        lane = InputContinuousHydrationLane;
        break;

      case DefaultLane:
        lane = DefaultHydrationLane;
        break;

      case TransitionLane1:
      case TransitionLane2:
      case TransitionLane3:
      case TransitionLane4:
      case TransitionLane5:
      case TransitionLane6:
      case TransitionLane7:
      case TransitionLane8:
      case TransitionLane9:
      case TransitionLane10:
      case TransitionLane11:
      case TransitionLane12:
      case TransitionLane13:
      case TransitionLane14:
      case TransitionLane15:
      case TransitionLane16:
      case RetryLane1:
      case RetryLane2:
      case RetryLane3:
      case RetryLane4:
        lane = TransitionHydrationLane;
        break;

      case IdleLane:
        lane = IdleHydrationLane;
        break;

      default:
        // Everything else is already either a hydration lane, or shouldn't
        // be retried at a hydration lane.
        lane = NoLane;
        break;
    }
  } // Check if the lane we chose is suspended. If so, that indicates that we
  // already attempted and failed to hydrate at that level. Also check if we're
  // already rendering that lane, which is rare but could happen.


  if ((lane & (root.suspendedLanes | renderLanes)) !== NoLane) {
    // Give up trying to hydrate and fall back to client render.
    return NoLane;
  }

  return lane;
}
function addFiberToLanesMap(root, fiber, lanes) {

  if (!isDevToolsPresent) {
    return;
  }

  var pendingUpdatersLaneMap = root.pendingUpdatersLaneMap;

  while (lanes > 0) {
    var index = laneToIndex(lanes);
    var lane = 1 << index;
    var updaters = pendingUpdatersLaneMap[index];
    updaters.add(fiber);
    lanes &= ~lane;
  }
}
function movePendingFibersToMemoized(root, lanes) {

  if (!isDevToolsPresent) {
    return;
  }

  var pendingUpdatersLaneMap = root.pendingUpdatersLaneMap;
  var memoizedUpdaters = root.memoizedUpdaters;

  while (lanes > 0) {
    var index = laneToIndex(lanes);
    var lane = 1 << index;
    var updaters = pendingUpdatersLaneMap[index];

    if (updaters.size > 0) {
      updaters.forEach(function (fiber) {
        var alternate = fiber.alternate;

        if (alternate === null || !memoizedUpdaters.has(alternate)) {
          memoizedUpdaters.add(fiber);
        }
      });
      updaters.clear();
    }

    lanes &= ~lane;
  }
}
function getTransitionsForLanes(root, lanes) {
  {
    return null;
  }
}

var DiscreteEventPriority = SyncLane;
var ContinuousEventPriority = InputContinuousLane;
var DefaultEventPriority = DefaultLane;
var IdleEventPriority = IdleLane;
var currentUpdatePriority = NoLane;
function getCurrentUpdatePriority() {
  return currentUpdatePriority;
}
function setCurrentUpdatePriority(newPriority) {
  currentUpdatePriority = newPriority;
}
function runWithPriority(priority, fn) {
  var previousPriority = currentUpdatePriority;

  try {
    currentUpdatePriority = priority;
    return fn();
  } finally {
    currentUpdatePriority = previousPriority;
  }
}
function higherEventPriority(a, b) {
  return a !== 0 && a < b ? a : b;
}
function lowerEventPriority(a, b) {
  return a === 0 || a > b ? a : b;
}
function isHigherEventPriority(a, b) {
  return a !== 0 && a < b;
}
function lanesToEventPriority(lanes) {
  var lane = getHighestPriorityLane(lanes);

  if (!isHigherEventPriority(DiscreteEventPriority, lane)) {
    return DiscreteEventPriority;
  }

  if (!isHigherEventPriority(ContinuousEventPriority, lane)) {
    return ContinuousEventPriority;
  }

  if (includesNonIdleWork(lane)) {
    return DefaultEventPriority;
  }

  return IdleEventPriority;
}

// This module only exists as an ESM wrapper around the external CommonJS
var scheduleCallback = Scheduler.unstable_scheduleCallback;
var cancelCallback = Scheduler.unstable_cancelCallback;
var shouldYield = Scheduler.unstable_shouldYield;
var requestPaint = Scheduler.unstable_requestPaint;
var now = Scheduler.unstable_now;
var ImmediatePriority = Scheduler.unstable_ImmediatePriority;
var UserBlockingPriority = Scheduler.unstable_UserBlockingPriority;
var NormalPriority = Scheduler.unstable_NormalPriority;
var IdlePriority = Scheduler.unstable_IdlePriority; // this doesn't actually exist on the scheduler, but it *does*

var rendererID = null;
var injectedHook = null;
var injectedProfilingHooks = null;
var isDevToolsPresent = typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ !== 'undefined';
function injectInternals(internals) {
  if (typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ === 'undefined') {
    // No DevTools
    return false;
  }

  var hook = __REACT_DEVTOOLS_GLOBAL_HOOK__;

  if (hook.isDisabled) {
    // This isn't a real property on the hook, but it can be set to opt out
    // of DevTools integration and associated warnings and logs.
    // https://github.com/facebook/react/issues/3877
    return true;
  }

  if (!hook.supportsFiber) {


    return true;
  }

  try {
    if (enableSchedulingProfiler) {
      // Conditionally inject these hooks only if Timeline profiler is supported by this build.
      // This gives DevTools a way to feature detect that isn't tied to version number
      // (since profiling and timeline are controlled by different feature flags).
      internals = assign({}, internals, {
        getLaneLabelMap: getLaneLabelMap,
        injectProfilingHooks: injectProfilingHooks
      });
    }

    rendererID = hook.inject(internals); // We have successfully injected, so now it is safe to set up hooks.

    injectedHook = hook;
  } catch (err) {
  }

  if (hook.checkDCE) {
    // This is the real DevTools.
    return true;
  } else {
    // This is likely a hook installed by Fast Refresh runtime.
    return false;
  }
}
function onCommitRoot(root, eventPriority) {
  if (injectedHook && typeof injectedHook.onCommitFiberRoot === 'function') {
    try {
      var didError = (root.current.flags & DidCapture) === DidCapture;

      if (enableProfilerTimer) {
        var schedulerPriority;

        switch (eventPriority) {
          case DiscreteEventPriority:
            schedulerPriority = ImmediatePriority;
            break;

          case ContinuousEventPriority:
            schedulerPriority = UserBlockingPriority;
            break;

          case DefaultEventPriority:
            schedulerPriority = NormalPriority;
            break;

          case IdleEventPriority:
            schedulerPriority = IdlePriority;
            break;

          default:
            schedulerPriority = NormalPriority;
            break;
        }

        injectedHook.onCommitFiberRoot(rendererID, root, schedulerPriority, didError);
      } else {
        injectedHook.onCommitFiberRoot(rendererID, root, undefined, didError);
      }
    } catch (err) {
    }
  }
}
function onPostCommitRoot(root) {
  if (injectedHook && typeof injectedHook.onPostCommitFiberRoot === 'function') {
    try {
      injectedHook.onPostCommitFiberRoot(rendererID, root);
    } catch (err) {
    }
  }
}
function onCommitUnmount(fiber) {
  if (injectedHook && typeof injectedHook.onCommitFiberUnmount === 'function') {
    try {
      injectedHook.onCommitFiberUnmount(rendererID, fiber);
    } catch (err) {
    }
  }
}

function injectProfilingHooks(profilingHooks) {
  injectedProfilingHooks = profilingHooks;
}

function getLaneLabelMap() {
  {
    var map = new Map();
    var lane = 1;

    for (var index = 0; index < TotalLanes; index++) {
      var label = getLabelForLane(lane);
      map.set(lane, label);
      lane *= 2;
    }

    return map;
  }
}

function markCommitStarted(lanes) {
  {
    if (injectedProfilingHooks !== null && typeof injectedProfilingHooks.markCommitStarted === 'function') {
      injectedProfilingHooks.markCommitStarted(lanes);
    }
  }
}
function markCommitStopped() {
  {
    if (injectedProfilingHooks !== null && typeof injectedProfilingHooks.markCommitStopped === 'function') {
      injectedProfilingHooks.markCommitStopped();
    }
  }
}
function markComponentRenderStarted(fiber) {
  {
    if (injectedProfilingHooks !== null && typeof injectedProfilingHooks.markComponentRenderStarted === 'function') {
      injectedProfilingHooks.markComponentRenderStarted(fiber);
    }
  }
}
function markComponentRenderStopped() {
  {
    if (injectedProfilingHooks !== null && typeof injectedProfilingHooks.markComponentRenderStopped === 'function') {
      injectedProfilingHooks.markComponentRenderStopped();
    }
  }
}
function markComponentPassiveEffectMountStarted(fiber) {
  {
    if (injectedProfilingHooks !== null && typeof injectedProfilingHooks.markComponentPassiveEffectMountStarted === 'function') {
      injectedProfilingHooks.markComponentPassiveEffectMountStarted(fiber);
    }
  }
}
function markComponentPassiveEffectMountStopped() {
  {
    if (injectedProfilingHooks !== null && typeof injectedProfilingHooks.markComponentPassiveEffectMountStopped === 'function') {
      injectedProfilingHooks.markComponentPassiveEffectMountStopped();
    }
  }
}
function markComponentPassiveEffectUnmountStarted(fiber) {
  {
    if (injectedProfilingHooks !== null && typeof injectedProfilingHooks.markComponentPassiveEffectUnmountStarted === 'function') {
      injectedProfilingHooks.markComponentPassiveEffectUnmountStarted(fiber);
    }
  }
}
function markComponentPassiveEffectUnmountStopped() {
  {
    if (injectedProfilingHooks !== null && typeof injectedProfilingHooks.markComponentPassiveEffectUnmountStopped === 'function') {
      injectedProfilingHooks.markComponentPassiveEffectUnmountStopped();
    }
  }
}
function markComponentLayoutEffectMountStarted(fiber) {
  {
    if (injectedProfilingHooks !== null && typeof injectedProfilingHooks.markComponentLayoutEffectMountStarted === 'function') {
      injectedProfilingHooks.markComponentLayoutEffectMountStarted(fiber);
    }
  }
}
function markComponentLayoutEffectMountStopped() {
  {
    if (injectedProfilingHooks !== null && typeof injectedProfilingHooks.markComponentLayoutEffectMountStopped === 'function') {
      injectedProfilingHooks.markComponentLayoutEffectMountStopped();
    }
  }
}
function markComponentLayoutEffectUnmountStarted(fiber) {
  {
    if (injectedProfilingHooks !== null && typeof injectedProfilingHooks.markComponentLayoutEffectUnmountStarted === 'function') {
      injectedProfilingHooks.markComponentLayoutEffectUnmountStarted(fiber);
    }
  }
}
function markComponentLayoutEffectUnmountStopped() {
  {
    if (injectedProfilingHooks !== null && typeof injectedProfilingHooks.markComponentLayoutEffectUnmountStopped === 'function') {
      injectedProfilingHooks.markComponentLayoutEffectUnmountStopped();
    }
  }
}
function markComponentErrored(fiber, thrownValue, lanes) {
  {
    if (injectedProfilingHooks !== null && typeof injectedProfilingHooks.markComponentErrored === 'function') {
      injectedProfilingHooks.markComponentErrored(fiber, thrownValue, lanes);
    }
  }
}
function markComponentSuspended(fiber, wakeable, lanes) {
  {
    if (injectedProfilingHooks !== null && typeof injectedProfilingHooks.markComponentSuspended === 'function') {
      injectedProfilingHooks.markComponentSuspended(fiber, wakeable, lanes);
    }
  }
}
function markLayoutEffectsStarted(lanes) {
  {
    if (injectedProfilingHooks !== null && typeof injectedProfilingHooks.markLayoutEffectsStarted === 'function') {
      injectedProfilingHooks.markLayoutEffectsStarted(lanes);
    }
  }
}
function markLayoutEffectsStopped() {
  {
    if (injectedProfilingHooks !== null && typeof injectedProfilingHooks.markLayoutEffectsStopped === 'function') {
      injectedProfilingHooks.markLayoutEffectsStopped();
    }
  }
}
function markPassiveEffectsStarted(lanes) {
  {
    if (injectedProfilingHooks !== null && typeof injectedProfilingHooks.markPassiveEffectsStarted === 'function') {
      injectedProfilingHooks.markPassiveEffectsStarted(lanes);
    }
  }
}
function markPassiveEffectsStopped() {
  {
    if (injectedProfilingHooks !== null && typeof injectedProfilingHooks.markPassiveEffectsStopped === 'function') {
      injectedProfilingHooks.markPassiveEffectsStopped();
    }
  }
}
function markRenderStarted(lanes) {
  {
    if (injectedProfilingHooks !== null && typeof injectedProfilingHooks.markRenderStarted === 'function') {
      injectedProfilingHooks.markRenderStarted(lanes);
    }
  }
}
function markRenderYielded() {
  {
    if (injectedProfilingHooks !== null && typeof injectedProfilingHooks.markRenderYielded === 'function') {
      injectedProfilingHooks.markRenderYielded();
    }
  }
}
function markRenderStopped() {
  {
    if (injectedProfilingHooks !== null && typeof injectedProfilingHooks.markRenderStopped === 'function') {
      injectedProfilingHooks.markRenderStopped();
    }
  }
}
function markRenderScheduled(lane) {
  {
    if (injectedProfilingHooks !== null && typeof injectedProfilingHooks.markRenderScheduled === 'function') {
      injectedProfilingHooks.markRenderScheduled(lane);
    }
  }
}
function markForceUpdateScheduled(fiber, lane) {
  {
    if (injectedProfilingHooks !== null && typeof injectedProfilingHooks.markForceUpdateScheduled === 'function') {
      injectedProfilingHooks.markForceUpdateScheduled(fiber, lane);
    }
  }
}
function markStateUpdateScheduled(fiber, lane) {
  {
    if (injectedProfilingHooks !== null && typeof injectedProfilingHooks.markStateUpdateScheduled === 'function') {
      injectedProfilingHooks.markStateUpdateScheduled(fiber, lane);
    }
  }
}

/**
 * inlined Object.is polyfill to avoid requiring consumers ship their own
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/is
 */
function is(x, y) {
  return x === y && (x !== 0 || 1 / x === 1 / y) || x !== x && y !== y // eslint-disable-line no-self-compare
  ;
}

var objectIs = // $FlowFixMe[method-unbinding]
typeof Object.is === 'function' ? Object.is : is;

var syncQueue = null;
var includesLegacySyncCallbacks = false;
var isFlushingSyncQueue = false;
function scheduleSyncCallback(callback) {
  // Push this callback into an internal queue. We'll flush these either in
  // the next tick, or earlier if something calls `flushSyncCallbackQueue`.
  if (syncQueue === null) {
    syncQueue = [callback];
  } else {
    // Push onto existing queue. Don't need to schedule a callback because
    // we already scheduled one when we created the queue.
    syncQueue.push(callback);
  }
}
function scheduleLegacySyncCallback(callback) {
  includesLegacySyncCallbacks = true;
  scheduleSyncCallback(callback);
}
function flushSyncCallbacksOnlyInLegacyMode() {
  // Only flushes the queue if there's a legacy sync callback scheduled.
  // TODO: There's only a single type of callback: performSyncOnWorkOnRoot. So
  // it might make more sense for the queue to be a list of roots instead of a
  // list of generic callbacks. Then we can have two: one for legacy roots, one
  // for concurrent roots. And this method would only flush the legacy ones.
  if (includesLegacySyncCallbacks) {
    flushSyncCallbacks();
  }
}
function flushSyncCallbacks() {
  if (!isFlushingSyncQueue && syncQueue !== null) {
    // Prevent re-entrance.
    isFlushingSyncQueue = true;
    var i = 0;
    var previousUpdatePriority = getCurrentUpdatePriority();

    try {
      var isSync = true;
      var queue = syncQueue; // TODO: Is this necessary anymore? The only user code that runs in this
      // queue is in the render or commit phases.

      setCurrentUpdatePriority(DiscreteEventPriority); // $FlowFixMe[incompatible-use] found when upgrading Flow

      for (; i < queue.length; i++) {
        // $FlowFixMe[incompatible-use] found when upgrading Flow
        var callback = queue[i];

        do {
          // $FlowFixMe[incompatible-type] we bail out when we get a null
          callback = callback(isSync);
        } while (callback !== null);
      }

      syncQueue = null;
      includesLegacySyncCallbacks = false;
    } catch (error) {
      // If something throws, leave the remaining callbacks on the queue.
      if (syncQueue !== null) {
        syncQueue = syncQueue.slice(i + 1);
      } // Resume flushing in the next tick


      scheduleCallback(ImmediatePriority, flushSyncCallbacks);
      throw error;
    } finally {
      setCurrentUpdatePriority(previousUpdatePriority);
      isFlushingSyncQueue = false;
    }
  }

  return null;
}

// This is imported by the event replaying implementation in React DOM. It's
// in a separate file to break a circular dependency between the renderer and
// the reconciler.
function isRootDehydrated(root) {
  var currentState = root.current.memoizedState;
  return currentState.isDehydrated;
}

// Intentionally not using it yet to derisk the initial implementation, because
// the way we push/pop these values is a bit unusual. If there's a mistake, I'd
// rather the ids be wrong than crash the whole reconciler.

var forkStack = [];
var forkStackIndex = 0;
var treeForkProvider = null;
var treeForkCount = 0;
var idStack = [];
var idStackIndex = 0;
var treeContextProvider = null;
var treeContextId = 1;
var treeContextOverflow = '';
function isForkedChild(workInProgress) {
  return (workInProgress.flags & Forked) !== NoFlags;
}
function getForksAtLevel(workInProgress) {
  return treeForkCount;
}
function getTreeId() {
  var overflow = treeContextOverflow;
  var idWithLeadingBit = treeContextId;
  var id = idWithLeadingBit & ~getLeadingBit(idWithLeadingBit);
  return id.toString(32) + overflow;
}
function pushTreeFork(workInProgress, totalChildren) {
  forkStack[forkStackIndex++] = treeForkCount;
  forkStack[forkStackIndex++] = treeForkProvider;
  treeForkProvider = workInProgress;
  treeForkCount = totalChildren;
}
function pushTreeId(workInProgress, totalChildren, index) {
  idStack[idStackIndex++] = treeContextId;
  idStack[idStackIndex++] = treeContextOverflow;
  idStack[idStackIndex++] = treeContextProvider;
  treeContextProvider = workInProgress;
  var baseIdWithLeadingBit = treeContextId;
  var baseOverflow = treeContextOverflow; // The leftmost 1 marks the end of the sequence, non-inclusive. It's not part
  // of the id; we use it to account for leading 0s.

  var baseLength = getBitLength(baseIdWithLeadingBit) - 1;
  var baseId = baseIdWithLeadingBit & ~(1 << baseLength);
  var slot = index + 1;
  var length = getBitLength(totalChildren) + baseLength; // 30 is the max length we can store without overflowing, taking into
  // consideration the leading 1 we use to mark the end of the sequence.

  if (length > 30) {
    // We overflowed the bitwise-safe range. Fall back to slower algorithm.
    // This branch assumes the length of the base id is greater than 5; it won't
    // work for smaller ids, because you need 5 bits per character.
    //
    // We encode the id in multiple steps: first the base id, then the
    // remaining digits.
    //
    // Each 5 bit sequence corresponds to a single base 32 character. So for
    // example, if the current id is 23 bits long, we can convert 20 of those
    // bits into a string of 4 characters, with 3 bits left over.
    //
    // First calculate how many bits in the base id represent a complete
    // sequence of characters.
    var numberOfOverflowBits = baseLength - baseLength % 5; // Then create a bitmask that selects only those bits.

    var newOverflowBits = (1 << numberOfOverflowBits) - 1; // Select the bits, and convert them to a base 32 string.

    var newOverflow = (baseId & newOverflowBits).toString(32); // Now we can remove those bits from the base id.

    var restOfBaseId = baseId >> numberOfOverflowBits;
    var restOfBaseLength = baseLength - numberOfOverflowBits; // Finally, encode the rest of the bits using the normal algorithm. Because
    // we made more room, this time it won't overflow.

    var restOfLength = getBitLength(totalChildren) + restOfBaseLength;
    var restOfNewBits = slot << restOfBaseLength;
    var id = restOfNewBits | restOfBaseId;
    var overflow = newOverflow + baseOverflow;
    treeContextId = 1 << restOfLength | id;
    treeContextOverflow = overflow;
  } else {
    // Normal path
    var newBits = slot << baseLength;

    var _id = newBits | baseId;

    var _overflow = baseOverflow;
    treeContextId = 1 << length | _id;
    treeContextOverflow = _overflow;
  }
}
function pushMaterializedTreeId(workInProgress) {
  // in its children.

  var returnFiber = workInProgress.return;

  if (returnFiber !== null) {
    var numberOfForks = 1;
    var slotIndex = 0;
    pushTreeFork(workInProgress, numberOfForks);
    pushTreeId(workInProgress, numberOfForks, slotIndex);
  }
}

function getBitLength(number) {
  return 32 - clz32(number);
}

function getLeadingBit(id) {
  return 1 << getBitLength(id) - 1;
}

function popTreeContext(workInProgress) {
  // Restore the previous values.
  // This is a bit more complicated than other context-like modules in Fiber
  // because the same Fiber may appear on the stack multiple times and for
  // different reasons. We have to keep popping until the work-in-progress is
  // no longer at the top of the stack.
  while (workInProgress === treeForkProvider) {
    treeForkProvider = forkStack[--forkStackIndex];
    forkStack[forkStackIndex] = null;
    treeForkCount = forkStack[--forkStackIndex];
    forkStack[forkStackIndex] = null;
  }

  while (workInProgress === treeContextProvider) {
    treeContextProvider = idStack[--idStackIndex];
    idStack[idStackIndex] = null;
    treeContextOverflow = idStack[--idStackIndex];
    idStack[idStackIndex] = null;
    treeContextId = idStack[--idStackIndex];
    idStack[idStackIndex] = null;
  }
}
function getSuspendedTreeContext() {

  if (treeContextProvider !== null) {
    return {
      id: treeContextId,
      overflow: treeContextOverflow
    };
  } else {
    return null;
  }
}
function restoreSuspendedTreeContext(workInProgress, suspendedContext) {
  idStack[idStackIndex++] = treeContextId;
  idStack[idStackIndex++] = treeContextOverflow;
  idStack[idStackIndex++] = treeContextProvider;
  treeContextId = suspendedContext.id;
  treeContextOverflow = suspendedContext.overflow;
  treeContextProvider = workInProgress;
}

var contextStackCursor$1 = createCursor(null);
var contextFiberStackCursor = createCursor(null);
var rootInstanceStackCursor = createCursor(null);

function requiredContext(c) {

  return c;
}

function getRootHostContainer() {
  var rootInstance = requiredContext(rootInstanceStackCursor.current);
  return rootInstance;
}

function pushHostContainer(fiber, nextRootInstance) {
  // Push current root instance onto the stack;
  // This allows us to reset root when portals are popped.
  push(rootInstanceStackCursor, nextRootInstance); // Track the context and the Fiber that provided it.
  // This enables us to pop only Fibers that provide unique contexts.

  push(contextFiberStackCursor, fiber); // Finally, we need to push the host context to the stack.
  // However, we can't just call getRootHostContext() and push it because
  // we'd have a different number of entries on the stack depending on
  // whether getRootHostContext() throws somewhere in renderer code or not.
  // So we push an empty value first. This lets us safely unwind on errors.

  push(contextStackCursor$1, null);
  var nextRootContext = getRootHostContext(nextRootInstance); // Now that we know this function doesn't throw, replace it.

  pop(contextStackCursor$1);
  push(contextStackCursor$1, nextRootContext);
}

function popHostContainer(fiber) {
  pop(contextStackCursor$1);
  pop(contextFiberStackCursor);
  pop(rootInstanceStackCursor);
}

function getHostContext() {
  var context = requiredContext(contextStackCursor$1.current);
  return context;
}

function pushHostContext(fiber) {
  var context = requiredContext(contextStackCursor$1.current);
  var nextContext = getChildHostContext(context, fiber.type); // Don't push this Fiber's context unless it's unique.

  if (context === nextContext) {
    return;
  } // Track the context and the Fiber that provided it.
  // This enables us to pop only Fibers that provide unique contexts.


  push(contextFiberStackCursor, fiber);
  push(contextStackCursor$1, nextContext);
}

function popHostContext(fiber) {
  // Do not pop unless this Fiber provided the current context.
  // pushHostContext() only pushes Fibers that provide unique contexts.
  if (contextFiberStackCursor.current !== fiber) {
    return;
  }

  pop(contextStackCursor$1);
  pop(contextFiberStackCursor);
}

// This may have been an insertion or a hydration.

var hydrationParentFiber = null;
var nextHydratableInstance = null;
var isHydrating = false; // This flag allows for warning supression when we expect there to be mismatches
// due to earlier mismatches or a suspended fiber.

var didSuspendOrErrorDEV = false; // Hydration errors that were thrown inside this boundary

var hydrationErrors = null;

function enterHydrationState(fiber) {
  if (!supportsHydration) {
    return false;
  }

  var parentInstance = fiber.stateNode.containerInfo;
  nextHydratableInstance = getFirstHydratableChildWithinContainer(parentInstance);
  hydrationParentFiber = fiber;
  isHydrating = true;
  hydrationErrors = null;
  didSuspendOrErrorDEV = false;
  return true;
}

function reenterHydrationStateFromDehydratedSuspenseInstance(fiber, suspenseInstance, treeContext) {
  if (!supportsHydration) {
    return false;
  }

  nextHydratableInstance = getFirstHydratableChildWithinSuspenseInstance(suspenseInstance);
  hydrationParentFiber = fiber;
  isHydrating = true;
  hydrationErrors = null;
  didSuspendOrErrorDEV = false;

  if (treeContext !== null) {
    restoreSuspendedTreeContext(fiber, treeContext);
  }

  return true;
}

function deleteHydratableInstance(returnFiber, instance) {
  var childToDelete = createFiberFromHostInstanceForDeletion();
  childToDelete.stateNode = instance;
  childToDelete.return = returnFiber;
  var deletions = returnFiber.deletions;

  if (deletions === null) {
    returnFiber.deletions = [childToDelete];
    returnFiber.flags |= ChildDeletion;
  } else {
    deletions.push(childToDelete);
  }
}

function insertNonHydratedInstance(returnFiber, fiber) {
  fiber.flags = fiber.flags & ~Hydrating | Placement;
}

function tryHydrate(fiber, nextInstance) {
  switch (fiber.tag) {
    // HostSingleton is intentionally omitted. the hydration pathway for singletons is non-fallible
    // you can find it inlined in claimHydratableSingleton
    case HostComponent:
      {
        var type = fiber.type;
        var props = fiber.pendingProps;
        var instance = canHydrateInstance(nextInstance, type, props);

        if (instance !== null) {
          fiber.stateNode = instance;
          hydrationParentFiber = fiber;
          nextHydratableInstance = getFirstHydratableChild(instance);
          return true;
        }

        return false;
      }

    case HostText:
      {
        var text = fiber.pendingProps;
        var textInstance = canHydrateTextInstance(nextInstance, text);

        if (textInstance !== null) {
          fiber.stateNode = textInstance;
          hydrationParentFiber = fiber; // Text Instances don't have children so there's nothing to hydrate.

          nextHydratableInstance = null;
          return true;
        }

        return false;
      }

    case SuspenseComponent:
      {
        var suspenseInstance = canHydrateSuspenseInstance(nextInstance);

        if (suspenseInstance !== null) {
          var suspenseState = {
            dehydrated: suspenseInstance,
            treeContext: getSuspendedTreeContext(),
            retryLane: OffscreenLane
          };
          fiber.memoizedState = suspenseState; // Store the dehydrated fragment as a child fiber.
          // This simplifies the code for getHostSibling and deleting nodes,
          // since it doesn't have to consider all Suspense boundaries and
          // check if they're dehydrated ones or not.

          var dehydratedFragment = createFiberFromDehydratedFragment(suspenseInstance);
          dehydratedFragment.return = fiber;
          fiber.child = dehydratedFragment;
          hydrationParentFiber = fiber; // While a Suspense Instance does have children, we won't step into
          // it during the first pass. Instead, we'll reenter it later.

          nextHydratableInstance = null;
          return true;
        }

        return false;
      }

    default:
      return false;
  }
}

function shouldClientRenderOnMismatch(fiber) {
  return (fiber.mode & ConcurrentMode) !== NoMode && (fiber.flags & DidCapture) === NoFlags;
}

function throwOnHydrationMismatch(fiber) {
  throw new Error('Hydration failed because the initial UI does not match what was ' + 'rendered on the server.');
}

function claimHydratableSingleton(fiber) {
  if ( supportsSingletons) {
    if (!isHydrating) {
      return;
    }

    var currentRootContainer = getRootHostContainer();
    var currentHostContext = getHostContext();
    var instance = fiber.stateNode = resolveSingletonInstance(fiber.type, fiber.pendingProps, currentRootContainer, currentHostContext, false);
    hydrationParentFiber = fiber;
    nextHydratableInstance = getFirstHydratableChild(instance);
  }
}

function tryToClaimNextHydratableInstance(fiber) {
  if (!isHydrating) {
    return;
  }

  if ( !isHydratable(fiber.type, fiber.pendingProps)) {
    // This fiber never hydrates from the DOM and always does an insert
    fiber.flags = fiber.flags & ~Hydrating | Placement;
    isHydrating = false;
    hydrationParentFiber = fiber;
    return;
  }

  var nextInstance = nextHydratableInstance;

  if (!nextInstance) {
    if (shouldClientRenderOnMismatch(fiber)) {
      throwOnHydrationMismatch();
    } // Nothing to hydrate. Make it an insertion.


    insertNonHydratedInstance(hydrationParentFiber, fiber);
    isHydrating = false;
    hydrationParentFiber = fiber;
    return;
  }

  var firstAttemptedInstance = nextInstance;

  if (!tryHydrate(fiber, nextInstance)) {
    if (shouldClientRenderOnMismatch(fiber)) {
      throwOnHydrationMismatch();
    } // If we can't hydrate this instance let's try the next one.
    // We use this as a heuristic. It's based on intuition and not data so it
    // might be flawed or unnecessary.


    nextInstance = getNextHydratableSibling(firstAttemptedInstance);
    var prevHydrationParentFiber = hydrationParentFiber;

    if (!nextInstance || !tryHydrate(fiber, nextInstance)) {
      // Nothing to hydrate. Make it an insertion.
      insertNonHydratedInstance(hydrationParentFiber, fiber);
      isHydrating = false;
      hydrationParentFiber = fiber;
      return;
    } // We matched the next one, we'll now assume that the first one was
    // superfluous and we'll delete it. Since we can't eagerly delete it
    // we'll have to schedule a deletion. To do that, this node needs a dummy
    // fiber associated with it.


    deleteHydratableInstance(prevHydrationParentFiber, firstAttemptedInstance);
  }
}

function prepareToHydrateHostInstance(fiber, hostContext) {
  if (!supportsHydration) {
    throw new Error('Expected prepareToHydrateHostInstance() to never be called. ' + 'This error is likely caused by a bug in React. Please file an issue.');
  }

  var instance = fiber.stateNode;
  var shouldWarnIfMismatchDev = !didSuspendOrErrorDEV;
  var updatePayload = hydrateInstance(instance, fiber.type, fiber.memoizedProps, hostContext, fiber, shouldWarnIfMismatchDev); // TODO: Type this specific to this type of component.

  fiber.updateQueue = updatePayload; // If the update payload indicates that there is a change or if there
  // is a new ref we mark this as an update.

  if (updatePayload !== null) {
    return true;
  }

  return false;
}

function prepareToHydrateHostTextInstance(fiber) {
  if (!supportsHydration) {
    throw new Error('Expected prepareToHydrateHostTextInstance() to never be called. ' + 'This error is likely caused by a bug in React. Please file an issue.');
  }

  var textInstance = fiber.stateNode;
  var textContent = fiber.memoizedProps;
  var shouldWarnIfMismatchDev = !didSuspendOrErrorDEV;
  var shouldUpdate = hydrateTextInstance(textInstance, textContent, fiber, shouldWarnIfMismatchDev);

  if (shouldUpdate) {
    // We assume that prepareToHydrateHostTextInstance is called in a context where the
    // hydration parent is the parent host component of this host text.
    var returnFiber = hydrationParentFiber;

    if (returnFiber !== null) {
      switch (returnFiber.tag) {
        case HostRoot:
          {
            var parentContainer = returnFiber.stateNode.containerInfo;
            var isConcurrentMode = (returnFiber.mode & ConcurrentMode) !== NoMode;
            didNotMatchHydratedContainerTextInstance(parentContainer, textInstance, textContent, // TODO: Delete this argument when we remove the legacy root API.
            isConcurrentMode, shouldWarnIfMismatchDev);
            break;
          }

        case HostSingleton:
        case HostComponent:
          {
            var parentType = returnFiber.type;
            var parentProps = returnFiber.memoizedProps;
            var parentInstance = returnFiber.stateNode;

            var _isConcurrentMode2 = (returnFiber.mode & ConcurrentMode) !== NoMode;

            didNotMatchHydratedTextInstance(parentType, parentProps, parentInstance, textInstance, textContent, // TODO: Delete this argument when we remove the legacy root API.
            _isConcurrentMode2, shouldWarnIfMismatchDev);
            break;
          }
      }
    }
  }

  return shouldUpdate;
}

function prepareToHydrateHostSuspenseInstance(fiber) {
  if (!supportsHydration) {
    throw new Error('Expected prepareToHydrateHostSuspenseInstance() to never be called. ' + 'This error is likely caused by a bug in React. Please file an issue.');
  }

  var suspenseState = fiber.memoizedState;
  var suspenseInstance = suspenseState !== null ? suspenseState.dehydrated : null;

  if (!suspenseInstance) {
    throw new Error('Expected to have a hydrated suspense instance. ' + 'This error is likely caused by a bug in React. Please file an issue.');
  }

  hydrateSuspenseInstance(suspenseInstance, fiber);
}

function skipPastDehydratedSuspenseInstance(fiber) {
  if (!supportsHydration) {
    throw new Error('Expected skipPastDehydratedSuspenseInstance() to never be called. ' + 'This error is likely caused by a bug in React. Please file an issue.');
  }

  var suspenseState = fiber.memoizedState;
  var suspenseInstance = suspenseState !== null ? suspenseState.dehydrated : null;

  if (!suspenseInstance) {
    throw new Error('Expected to have a hydrated suspense instance. ' + 'This error is likely caused by a bug in React. Please file an issue.');
  }

  return getNextHydratableInstanceAfterSuspenseInstance(suspenseInstance);
}

function popToNextHostParent(fiber) {
  var parent = fiber.return;

  while (parent !== null && parent.tag !== HostComponent && parent.tag !== HostRoot && parent.tag !== SuspenseComponent && (!( supportsSingletons) ? true : parent.tag !== HostSingleton)) {
    parent = parent.return;
  }

  hydrationParentFiber = parent;
}

function popHydrationState(fiber) {
  if (!supportsHydration) {
    return false;
  }

  if (fiber !== hydrationParentFiber) {
    // We're deeper than the current hydration context, inside an inserted
    // tree.
    return false;
  }

  if (!isHydrating) {
    // If we're not currently hydrating but we're in a hydration context, then
    // we were an insertion and now need to pop up reenter hydration of our
    // siblings.
    popToNextHostParent(fiber);
    isHydrating = true;
    return false;
  }

  var shouldClear = false;

  if ( supportsSingletons) {
    // With float we never clear the Root, or Singleton instances. We also do not clear Instances
    // that have singleton text content
    if (fiber.tag !== HostRoot && fiber.tag !== HostSingleton && !(fiber.tag === HostComponent && shouldSetTextContent(fiber.type, fiber.memoizedProps))) {
      shouldClear = true;
    }
  } else {
    // If we have any remaining hydratable nodes, we need to delete them now.
    // We only do this deeper than head and body since they tend to have random
    // other nodes in them. We also ignore components with pure text content in
    // side of them. We also don't delete anything inside the root container.
    if (fiber.tag !== HostRoot && (fiber.tag !== HostComponent || shouldDeleteUnhydratedTailInstances(fiber.type) && !shouldSetTextContent(fiber.type, fiber.memoizedProps))) {
      shouldClear = true;
    }
  }

  if (shouldClear) {
    var nextInstance = nextHydratableInstance;

    if (nextInstance) {
      if (shouldClientRenderOnMismatch(fiber)) {
        warnIfUnhydratedTailNodes();
        throwOnHydrationMismatch();
      } else {
        while (nextInstance) {
          deleteHydratableInstance(fiber, nextInstance);
          nextInstance = getNextHydratableSibling(nextInstance);
        }
      }
    }
  }

  popToNextHostParent(fiber);

  if (fiber.tag === SuspenseComponent) {
    nextHydratableInstance = skipPastDehydratedSuspenseInstance(fiber);
  } else {
    nextHydratableInstance = hydrationParentFiber ? getNextHydratableSibling(fiber.stateNode) : null;
  }

  return true;
}

function hasUnhydratedTailNodes() {
  return isHydrating && nextHydratableInstance !== null;
}

function warnIfUnhydratedTailNodes(fiber) {
  var nextInstance = nextHydratableInstance;

  while (nextInstance) {
    nextInstance = getNextHydratableSibling(nextInstance);
  }
}

function resetHydrationState() {
  if (!supportsHydration) {
    return;
  }

  hydrationParentFiber = null;
  nextHydratableInstance = null;
  isHydrating = false;
  didSuspendOrErrorDEV = false;
}

function upgradeHydrationErrorsToRecoverable() {
  if (hydrationErrors !== null) {
    // Successfully completed a forced client render. The errors that occurred
    // during the hydration attempt are now recovered. We will log them in
    // commit phase, once the entire tree has finished.
    queueRecoverableErrors(hydrationErrors);
    hydrationErrors = null;
  }
}

function getIsHydrating() {
  return isHydrating;
}

function queueHydrationError(error) {
  if (hydrationErrors === null) {
    hydrationErrors = [error];
  } else {
    hydrationErrors.push(error);
  }
}

// we wait until the current render is over (either finished or interrupted)
// before adding it to the fiber/hook queue. Push to this array so we can
// access the queue, fiber, update, et al later.

var concurrentQueues = [];
var concurrentQueuesIndex = 0;
var concurrentlyUpdatedLanes = NoLanes;
function finishQueueingConcurrentUpdates() {
  var endIndex = concurrentQueuesIndex;
  concurrentQueuesIndex = 0;
  concurrentlyUpdatedLanes = NoLanes;
  var i = 0;

  while (i < endIndex) {
    var fiber = concurrentQueues[i];
    concurrentQueues[i++] = null;
    var queue = concurrentQueues[i];
    concurrentQueues[i++] = null;
    var update = concurrentQueues[i];
    concurrentQueues[i++] = null;
    var lane = concurrentQueues[i];
    concurrentQueues[i++] = null;

    if (queue !== null && update !== null) {
      var pending = queue.pending;

      if (pending === null) {
        // This is the first update. Create a circular list.
        update.next = update;
      } else {
        update.next = pending.next;
        pending.next = update;
      }

      queue.pending = update;
    }

    if (lane !== NoLane) {
      markUpdateLaneFromFiberToRoot(fiber, update, lane);
    }
  }
}
function getConcurrentlyUpdatedLanes() {
  return concurrentlyUpdatedLanes;
}

function enqueueUpdate(fiber, queue, update, lane) {
  // Don't update the `childLanes` on the return path yet. If we already in
  // the middle of rendering, wait until after it has completed.
  concurrentQueues[concurrentQueuesIndex++] = fiber;
  concurrentQueues[concurrentQueuesIndex++] = queue;
  concurrentQueues[concurrentQueuesIndex++] = update;
  concurrentQueues[concurrentQueuesIndex++] = lane;
  concurrentlyUpdatedLanes = mergeLanes(concurrentlyUpdatedLanes, lane); // The fiber's `lane` field is used in some places to check if any work is
  // scheduled, to perform an eager bailout, so we need to update it immediately.
  // TODO: We should probably move this to the "shared" queue instead.

  fiber.lanes = mergeLanes(fiber.lanes, lane);
  var alternate = fiber.alternate;

  if (alternate !== null) {
    alternate.lanes = mergeLanes(alternate.lanes, lane);
  }
}

function enqueueConcurrentHookUpdate(fiber, queue, update, lane) {
  var concurrentQueue = queue;
  var concurrentUpdate = update;
  enqueueUpdate(fiber, concurrentQueue, concurrentUpdate, lane);
  return getRootForUpdatedFiber(fiber);
}
function enqueueConcurrentHookUpdateAndEagerlyBailout(fiber, queue, update) {
  // This function is used to queue an update that doesn't need a rerender. The
  // only reason we queue it is in case there's a subsequent higher priority
  // update that causes it to be rebased.
  var lane = NoLane;
  var concurrentQueue = queue;
  var concurrentUpdate = update;
  enqueueUpdate(fiber, concurrentQueue, concurrentUpdate, lane); // Usually we can rely on the upcoming render phase to process the concurrent
  // queue. However, since this is a bail out, we're not scheduling any work
  // here. So the update we just queued will leak until something else happens
  // to schedule work (if ever).
  //
  // Check if we're currently in the middle of rendering a tree, and if not,
  // process the queue immediately to prevent a leak.

  var isConcurrentlyRendering = getWorkInProgressRoot() !== null;

  if (!isConcurrentlyRendering) {
    finishQueueingConcurrentUpdates();
  }
}
function enqueueConcurrentClassUpdate(fiber, queue, update, lane) {
  var concurrentQueue = queue;
  var concurrentUpdate = update;
  enqueueUpdate(fiber, concurrentQueue, concurrentUpdate, lane);
  return getRootForUpdatedFiber(fiber);
}
function enqueueConcurrentRenderForLane(fiber, lane) {
  enqueueUpdate(fiber, null, null, lane);
  return getRootForUpdatedFiber(fiber);
} // Calling this function outside this module should only be done for backwards
// compatibility and should always be accompanied by a warning.

function unsafe_markUpdateLaneFromFiberToRoot(sourceFiber, lane) {
  // NOTE: For Hyrum's Law reasons, if an infinite update loop is detected, it
  // should throw before `markUpdateLaneFromFiberToRoot` is called. But this is
  // undefined behavior and we can change it if we need to; it just so happens
  // that, at the time of this writing, there's an internal product test that
  // happens to rely on this.
  var root = getRootForUpdatedFiber(sourceFiber);
  markUpdateLaneFromFiberToRoot(sourceFiber, null, lane);
  return root;
}

function markUpdateLaneFromFiberToRoot(sourceFiber, update, lane) {
  // Update the source fiber's lanes
  sourceFiber.lanes = mergeLanes(sourceFiber.lanes, lane);
  var alternate = sourceFiber.alternate;

  if (alternate !== null) {
    alternate.lanes = mergeLanes(alternate.lanes, lane);
  } // Walk the parent path to the root and update the child lanes.


  var isHidden = false;
  var parent = sourceFiber.return;
  var node = sourceFiber;

  while (parent !== null) {
    parent.childLanes = mergeLanes(parent.childLanes, lane);
    alternate = parent.alternate;

    if (alternate !== null) {
      alternate.childLanes = mergeLanes(alternate.childLanes, lane);
    }

    if (parent.tag === OffscreenComponent) {
      // Check if this offscreen boundary is currently hidden.
      //
      // The instance may be null if the Offscreen parent was unmounted. Usually
      // the parent wouldn't be reachable in that case because we disconnect
      // fibers from the tree when they are deleted. However, there's a weird
      // edge case where setState is called on a fiber that was interrupted
      // before it ever mounted. Because it never mounts, it also never gets
      // deleted. Because it never gets deleted, its return pointer never gets
      // disconnected. Which means it may be attached to a deleted Offscreen
      // parent node. (This discovery suggests it may be better for memory usage
      // if we don't attach the `return` pointer until the commit phase, though
      // in order to do that we'd need some other way to track the return
      // pointer during the initial render, like on the stack.)
      //
      // This case is always accompanied by a warning, but we still need to
      // account for it. (There may be other cases that we haven't discovered,
      // too.)
      var offscreenInstance = parent.stateNode;

      if (offscreenInstance !== null && !(offscreenInstance._visibility & OffscreenVisible)) {
        isHidden = true;
      }
    }

    node = parent;
    parent = parent.return;
  }

  if (isHidden && update !== null && node.tag === HostRoot) {
    var root = node.stateNode;
    markHiddenUpdate(root, update, lane);
  }
}

function getRootForUpdatedFiber(sourceFiber) {
  // TODO: We will detect and infinite update loop and throw even if this fiber
  // has already unmounted. This isn't really necessary but it happens to be the
  // current behavior we've used for several release cycles. Consider not
  // performing this check if the updated fiber already unmounted, since it's
  // not possible for that to cause an infinite update loop.
  throwIfInfiniteUpdateLoopDetected(); // When a setState happens, we must ensure the root is scheduled. Because
  var node = sourceFiber;
  var parent = node.return;

  while (parent !== null) {
    node = parent;
    parent = node.return;
  }

  return node.tag === HostRoot ? node.stateNode : null;
}

var UpdateState = 0;
var ReplaceState = 1;
var ForceUpdate = 2;
var CaptureUpdate = 3; // Global state that is reset at the beginning of calling `processUpdateQueue`.
// It should only be read right after calling `processUpdateQueue`, via
// `checkHasForceUpdateAfterProcessing`.

var hasForceUpdate = false;

function initializeUpdateQueue(fiber) {
  var queue = {
    baseState: fiber.memoizedState,
    firstBaseUpdate: null,
    lastBaseUpdate: null,
    shared: {
      pending: null,
      lanes: NoLanes,
      hiddenCallbacks: null
    },
    callbacks: null
  };
  fiber.updateQueue = queue;
}
function cloneUpdateQueue(current, workInProgress) {
  // Clone the update queue from current. Unless it's already a clone.
  var queue = workInProgress.updateQueue;
  var currentQueue = current.updateQueue;

  if (queue === currentQueue) {
    var clone = {
      baseState: currentQueue.baseState,
      firstBaseUpdate: currentQueue.firstBaseUpdate,
      lastBaseUpdate: currentQueue.lastBaseUpdate,
      shared: currentQueue.shared,
      callbacks: null
    };
    workInProgress.updateQueue = clone;
  }
}
function createUpdate(eventTime, lane) {
  var update = {
    eventTime: eventTime,
    lane: lane,
    tag: UpdateState,
    payload: null,
    callback: null,
    next: null
  };
  return update;
}
function enqueueUpdate$1(fiber, update, lane) {
  var updateQueue = fiber.updateQueue;

  if (updateQueue === null) {
    // Only occurs if the fiber has been unmounted.
    return null;
  }

  var sharedQueue = updateQueue.shared;

  if (isUnsafeClassRenderPhaseUpdate()) {
    // This is an unsafe render phase update. Add directly to the update
    // queue so we can process it immediately during the current render.
    var pending = sharedQueue.pending;

    if (pending === null) {
      // This is the first update. Create a circular list.
      update.next = update;
    } else {
      update.next = pending.next;
      pending.next = update;
    }

    sharedQueue.pending = update; // Update the childLanes even though we're most likely already rendering
    // this fiber. This is for backwards compatibility in the case where you
    // update a different component during render phase than the one that is
    // currently renderings (a pattern that is accompanied by a warning).

    return unsafe_markUpdateLaneFromFiberToRoot(fiber, lane);
  } else {
    return enqueueConcurrentClassUpdate(fiber, sharedQueue, update, lane);
  }
}
function entangleTransitions(root, fiber, lane) {
  var updateQueue = fiber.updateQueue;

  if (updateQueue === null) {
    // Only occurs if the fiber has been unmounted.
    return;
  }

  var sharedQueue = updateQueue.shared;

  if (isTransitionLane(lane)) {
    var queueLanes = sharedQueue.lanes; // If any entangled lanes are no longer pending on the root, then they must
    // have finished. We can remove them from the shared queue, which represents
    // a superset of the actually pending lanes. In some cases we may entangle
    // more than we need to, but that's OK. In fact it's worse if we *don't*
    // entangle when we should.

    queueLanes = intersectLanes(queueLanes, root.pendingLanes); // Entangle the new transition lane with the other transition lanes.

    var newQueueLanes = mergeLanes(queueLanes, lane);
    sharedQueue.lanes = newQueueLanes; // Even if queue.lanes already include lane, we don't know for certain if
    // the lane finished since the last time we entangled it. So we need to
    // entangle it again, just to be sure.

    markRootEntangled(root, newQueueLanes);
  }
}
function enqueueCapturedUpdate(workInProgress, capturedUpdate) {
  // Captured updates are updates that are thrown by a child during the render
  // phase. They should be discarded if the render is aborted. Therefore,
  // we should only put them on the work-in-progress queue, not the current one.
  var queue = workInProgress.updateQueue; // Check if the work-in-progress queue is a clone.

  var current = workInProgress.alternate;

  if (current !== null) {
    var currentQueue = current.updateQueue;

    if (queue === currentQueue) {
      // The work-in-progress queue is the same as current. This happens when
      // we bail out on a parent fiber that then captures an error thrown by
      // a child. Since we want to append the update only to the work-in
      // -progress queue, we need to clone the updates. We usually clone during
      // processUpdateQueue, but that didn't happen in this case because we
      // skipped over the parent when we bailed out.
      var newFirst = null;
      var newLast = null;
      var firstBaseUpdate = queue.firstBaseUpdate;

      if (firstBaseUpdate !== null) {
        // Loop through the updates and clone them.
        var update = firstBaseUpdate;

        do {
          var clone = {
            eventTime: update.eventTime,
            lane: update.lane,
            tag: update.tag,
            payload: update.payload,
            // When this update is rebased, we should not fire its
            // callback again.
            callback: null,
            next: null
          };

          if (newLast === null) {
            newFirst = newLast = clone;
          } else {
            newLast.next = clone;
            newLast = clone;
          } // $FlowFixMe[incompatible-type] we bail out when we get a null


          update = update.next;
        } while (update !== null); // Append the captured update the end of the cloned list.


        if (newLast === null) {
          newFirst = newLast = capturedUpdate;
        } else {
          newLast.next = capturedUpdate;
          newLast = capturedUpdate;
        }
      } else {
        // There are no base updates.
        newFirst = newLast = capturedUpdate;
      }

      queue = {
        baseState: currentQueue.baseState,
        firstBaseUpdate: newFirst,
        lastBaseUpdate: newLast,
        shared: currentQueue.shared,
        callbacks: currentQueue.callbacks
      };
      workInProgress.updateQueue = queue;
      return;
    }
  } // Append the update to the end of the list.


  var lastBaseUpdate = queue.lastBaseUpdate;

  if (lastBaseUpdate === null) {
    queue.firstBaseUpdate = capturedUpdate;
  } else {
    lastBaseUpdate.next = capturedUpdate;
  }

  queue.lastBaseUpdate = capturedUpdate;
}

function getStateFromUpdate(workInProgress, queue, update, prevState, nextProps, instance) {
  switch (update.tag) {
    case ReplaceState:
      {
        var payload = update.payload;

        if (typeof payload === 'function') {

          var nextState = payload.call(instance, prevState, nextProps);

          return nextState;
        } // State object


        return payload;
      }

    case CaptureUpdate:
      {
        workInProgress.flags = workInProgress.flags & ~ShouldCapture | DidCapture;
      }
    // Intentional fallthrough

    case UpdateState:
      {
        var _payload = update.payload;
        var partialState;

        if (typeof _payload === 'function') {

          partialState = _payload.call(instance, prevState, nextProps);
        } else {
          // Partial state object
          partialState = _payload;
        }

        if (partialState === null || partialState === undefined) {
          // Null and undefined are treated as no-ops.
          return prevState;
        } // Merge the partial state and the previous state.


        return assign({}, prevState, partialState);
      }

    case ForceUpdate:
      {
        hasForceUpdate = true;
        return prevState;
      }
  }

  return prevState;
}

function processUpdateQueue(workInProgress, props, instance, renderLanes) {
  // This is always non-null on a ClassComponent or HostRoot
  var queue = workInProgress.updateQueue;
  hasForceUpdate = false;

  var firstBaseUpdate = queue.firstBaseUpdate;
  var lastBaseUpdate = queue.lastBaseUpdate; // Check if there are pending updates. If so, transfer them to the base queue.

  var pendingQueue = queue.shared.pending;

  if (pendingQueue !== null) {
    queue.shared.pending = null; // The pending queue is circular. Disconnect the pointer between first
    // and last so that it's non-circular.

    var lastPendingUpdate = pendingQueue;
    var firstPendingUpdate = lastPendingUpdate.next;
    lastPendingUpdate.next = null; // Append pending updates to base queue

    if (lastBaseUpdate === null) {
      firstBaseUpdate = firstPendingUpdate;
    } else {
      lastBaseUpdate.next = firstPendingUpdate;
    }

    lastBaseUpdate = lastPendingUpdate; // If there's a current queue, and it's different from the base queue, then
    // we need to transfer the updates to that queue, too. Because the base
    // queue is a singly-linked list with no cycles, we can append to both
    // lists and take advantage of structural sharing.
    // TODO: Pass `current` as argument

    var current = workInProgress.alternate;

    if (current !== null) {
      // This is always non-null on a ClassComponent or HostRoot
      var currentQueue = current.updateQueue;
      var currentLastBaseUpdate = currentQueue.lastBaseUpdate;

      if (currentLastBaseUpdate !== lastBaseUpdate) {
        if (currentLastBaseUpdate === null) {
          currentQueue.firstBaseUpdate = firstPendingUpdate;
        } else {
          currentLastBaseUpdate.next = firstPendingUpdate;
        }

        currentQueue.lastBaseUpdate = lastPendingUpdate;
      }
    }
  } // These values may change as we process the queue.


  if (firstBaseUpdate !== null) {
    // Iterate through the list of updates to compute the result.
    var newState = queue.baseState; // TODO: Don't need to accumulate this. Instead, we can remove renderLanes
    // from the original lanes.

    var newLanes = NoLanes;
    var newBaseState = null;
    var newFirstBaseUpdate = null;
    var newLastBaseUpdate = null;
    var update = firstBaseUpdate;

    do {
      // TODO: Don't need this field anymore
      var updateEventTime = update.eventTime; // An extra OffscreenLane bit is added to updates that were made to
      // a hidden tree, so that we can distinguish them from updates that were
      // already there when the tree was hidden.

      var updateLane = removeLanes(update.lane, OffscreenLane);
      var isHiddenUpdate = updateLane !== update.lane; // Check if this update was made while the tree was hidden. If so, then
      // it's not a "base" update and we should disregard the extra base lanes
      // that were added to renderLanes when we entered the Offscreen tree.

      var shouldSkipUpdate = isHiddenUpdate ? !isSubsetOfLanes(getWorkInProgressRootRenderLanes(), updateLane) : !isSubsetOfLanes(renderLanes, updateLane);

      if (shouldSkipUpdate) {
        // Priority is insufficient. Skip this update. If this is the first
        // skipped update, the previous update/state is the new base
        // update/state.
        var clone = {
          eventTime: updateEventTime,
          lane: updateLane,
          tag: update.tag,
          payload: update.payload,
          callback: update.callback,
          next: null
        };

        if (newLastBaseUpdate === null) {
          newFirstBaseUpdate = newLastBaseUpdate = clone;
          newBaseState = newState;
        } else {
          newLastBaseUpdate = newLastBaseUpdate.next = clone;
        } // Update the remaining priority in the queue.


        newLanes = mergeLanes(newLanes, updateLane);
      } else {
        // This update does have sufficient priority.
        if (newLastBaseUpdate !== null) {
          var _clone = {
            eventTime: updateEventTime,
            // This update is going to be committed so we never want uncommit
            // it. Using NoLane works because 0 is a subset of all bitmasks, so
            // this will never be skipped by the check above.
            lane: NoLane,
            tag: update.tag,
            payload: update.payload,
            // When this update is rebased, we should not fire its
            // callback again.
            callback: null,
            next: null
          };
          newLastBaseUpdate = newLastBaseUpdate.next = _clone;
        } // Process this update.


        newState = getStateFromUpdate(workInProgress, queue, update, newState, props, instance);
        var callback = update.callback;

        if (callback !== null) {
          workInProgress.flags |= Callback;

          if (isHiddenUpdate) {
            workInProgress.flags |= Visibility;
          }

          var callbacks = queue.callbacks;

          if (callbacks === null) {
            queue.callbacks = [callback];
          } else {
            callbacks.push(callback);
          }
        }
      } // $FlowFixMe[incompatible-type] we bail out when we get a null


      update = update.next;

      if (update === null) {
        pendingQueue = queue.shared.pending;

        if (pendingQueue === null) {
          break;
        } else {
          // An update was scheduled from inside a reducer. Add the new
          // pending updates to the end of the list and keep processing.
          var _lastPendingUpdate = pendingQueue; // Intentionally unsound. Pending updates form a circular list, but we
          // unravel them when transferring them to the base queue.

          var _firstPendingUpdate = _lastPendingUpdate.next;
          _lastPendingUpdate.next = null;
          update = _firstPendingUpdate;
          queue.lastBaseUpdate = _lastPendingUpdate;
          queue.shared.pending = null;
        }
      }
    } while (true);

    if (newLastBaseUpdate === null) {
      newBaseState = newState;
    }

    queue.baseState = newBaseState;
    queue.firstBaseUpdate = newFirstBaseUpdate;
    queue.lastBaseUpdate = newLastBaseUpdate;

    if (firstBaseUpdate === null) {
      // `queue.lanes` is used for entangling transitions. We can set it back to
      // zero once the queue is empty.
      queue.shared.lanes = NoLanes;
    } // Set the remaining expiration time to be whatever is remaining in the queue.
    // This should be fine because the only two other things that contribute to
    // expiration time are props and context. We're already in the middle of the
    // begin phase by the time we start processing the queue, so we've already
    // dealt with the props. Context in components that specify
    // shouldComponentUpdate is tricky; but we'll have to account for
    // that regardless.


    markSkippedUpdateLanes(newLanes);
    workInProgress.lanes = newLanes;
    workInProgress.memoizedState = newState;
  }
}

function callCallback(callback, context) {
  if (typeof callback !== 'function') {
    throw new Error('Invalid argument passed as callback. Expected a function. Instead ' + ("received: " + callback));
  }

  callback.call(context);
}

function resetHasForceUpdateBeforeProcessing() {
  hasForceUpdate = false;
}
function checkHasForceUpdateAfterProcessing() {
  return hasForceUpdate;
}
function deferHiddenCallbacks(updateQueue) {
  // When an update finishes on a hidden component, its callback should not
  // be fired until/unless the component is made visible again. Stash the
  // callback on the shared queue object so it can be fired later.
  var newHiddenCallbacks = updateQueue.callbacks;

  if (newHiddenCallbacks !== null) {
    var existingHiddenCallbacks = updateQueue.shared.hiddenCallbacks;

    if (existingHiddenCallbacks === null) {
      updateQueue.shared.hiddenCallbacks = newHiddenCallbacks;
    } else {
      updateQueue.shared.hiddenCallbacks = existingHiddenCallbacks.concat(newHiddenCallbacks);
    }
  }
}
function commitHiddenCallbacks(updateQueue, context) {
  // This component is switching from hidden -> visible. Commit any callbacks
  // that were previously deferred.
  var hiddenCallbacks = updateQueue.shared.hiddenCallbacks;

  if (hiddenCallbacks !== null) {
    updateQueue.shared.hiddenCallbacks = null;

    for (var i = 0; i < hiddenCallbacks.length; i++) {
      var callback = hiddenCallbacks[i];
      callCallback(callback, context);
    }
  }
}
function commitCallbacks(updateQueue, context) {
  var callbacks = updateQueue.callbacks;

  if (callbacks !== null) {
    updateQueue.callbacks = null;

    for (var i = 0; i < callbacks.length; i++) {
      var callback = callbacks[i];
      callCallback(callback, context);
    }
  }
}

/**
 * Performs equality by iterating through keys on an object and returning false
 * when any key has values which are not strictly equal between the arguments.
 * Returns true when the values of all keys are strictly equal.
 */

function shallowEqual(objA, objB) {
  if (objectIs(objA, objB)) {
    return true;
  }

  if (typeof objA !== 'object' || objA === null || typeof objB !== 'object' || objB === null) {
    return false;
  }

  var keysA = Object.keys(objA);
  var keysB = Object.keys(objB);

  if (keysA.length !== keysB.length) {
    return false;
  } // Test for A's keys different from B.


  for (var i = 0; i < keysA.length; i++) {
    var currentKey = keysA[i];

    if (!hasOwnProperty.call(objB, currentKey) || !objectIs(objA[currentKey], objB[currentKey])) {
      return false;
    }
  }

  return true;
}

function describeFiber(fiber) {

  switch (fiber.tag) {
    case HostResource:
    case HostSingleton:
    case HostComponent:
      return describeBuiltInComponentFrame(fiber.type);

    case LazyComponent:
      return describeBuiltInComponentFrame('Lazy');

    case SuspenseComponent:
      return describeBuiltInComponentFrame('Suspense');

    case SuspenseListComponent:
      return describeBuiltInComponentFrame('SuspenseList');

    case FunctionComponent:
    case IndeterminateComponent:
    case SimpleMemoComponent:
      return describeFunctionComponentFrame(fiber.type);

    case ForwardRef:
      return describeFunctionComponentFrame(fiber.type.render);

    case ClassComponent:
      return describeClassComponentFrame(fiber.type);

    default:
      return '';
  }
}

function getStackByFiberInDevAndProd(workInProgress) {
  try {
    var info = '';
    var node = workInProgress;

    do {
      info += describeFiber(node); // $FlowFixMe[incompatible-type] we bail out when we get a null

      node = node.return;
    } while (node);

    return info;
  } catch (x) {
    return '\nError generating stack: ' + x.message + '\n' + x.stack;
  }
}

var ReactDebugCurrentFrame$1 = ReactSharedInternals.ReactDebugCurrentFrame;

function coerceRef(returnFiber, current, element) {
  var mixedRef = element.ref;

  if (mixedRef !== null && typeof mixedRef !== 'function' && typeof mixedRef !== 'object') {

    if (element._owner) {
      var owner = element._owner;
      var inst;

      if (owner) {
        var ownerFiber = owner;

        if (ownerFiber.tag !== ClassComponent) {
          throw new Error('Function components cannot have string refs. ' + 'We recommend using useRef() instead. ' + 'Learn more about using refs safely here: ' + 'https://reactjs.org/link/strict-mode-string-ref');
        }

        inst = ownerFiber.stateNode;
      }

      if (!inst) {
        throw new Error("Missing owner for string ref " + mixedRef + ". This error is likely caused by a " + 'bug in React. Please file an issue.');
      } // Assigning this to a const so Flow knows it won't change in the closure


      var resolvedInst = inst;

      var stringRef = '' + mixedRef; // Check if previous string ref matches new string ref

      if (current !== null && current.ref !== null && typeof current.ref === 'function' && current.ref._stringRef === stringRef) {
        return current.ref;
      }

      var ref = function (value) {
        var refs = resolvedInst.refs;

        if (value === null) {
          delete refs[stringRef];
        } else {
          refs[stringRef] = value;
        }
      };

      ref._stringRef = stringRef;
      return ref;
    } else {
      if (typeof mixedRef !== 'string') {
        throw new Error('Expected ref to be a function, a string, an object returned by React.createRef(), or null.');
      }

      if (!element._owner) {
        throw new Error("Element ref was specified as a string (" + mixedRef + ") but no owner was set. This could happen for one of" + ' the following reasons:\n' + '1. You may be adding a ref to a function component\n' + "2. You may be adding a ref to a component that was not created inside a component's render method\n" + '3. You have multiple copies of React loaded\n' + 'See https://reactjs.org/link/refs-must-have-owner for more information.');
      }
    }
  }

  return mixedRef;
}

function throwOnInvalidObjectType(returnFiber, newChild) {
  // $FlowFixMe[method-unbinding]
  var childString = Object.prototype.toString.call(newChild);
  throw new Error("Objects are not valid as a React child (found: " + (childString === '[object Object]' ? 'object with keys {' + Object.keys(newChild).join(', ') + '}' : childString) + "). " + 'If you meant to render a collection of children, use an array ' + 'instead.');
}

function resolveLazy(lazyType) {
  var payload = lazyType._payload;
  var init = lazyType._init;
  return init(payload);
} // This wrapper function exists because I expect to clone the code in each path
// to be able to optimize each path individually by branching early. This needs
// a compiler or we can do it manually. Helpers that don't need this branching
// live outside of this function.


function createChildReconciler(shouldTrackSideEffects) {
  function deleteChild(returnFiber, childToDelete) {
    if (!shouldTrackSideEffects) {
      // Noop.
      return;
    }

    var deletions = returnFiber.deletions;

    if (deletions === null) {
      returnFiber.deletions = [childToDelete];
      returnFiber.flags |= ChildDeletion;
    } else {
      deletions.push(childToDelete);
    }
  }

  function deleteRemainingChildren(returnFiber, currentFirstChild) {
    if (!shouldTrackSideEffects) {
      // Noop.
      return null;
    } // TODO: For the shouldClone case, this could be micro-optimized a bit by
    // assuming that after the first child we've already added everything.


    var childToDelete = currentFirstChild;

    while (childToDelete !== null) {
      deleteChild(returnFiber, childToDelete);
      childToDelete = childToDelete.sibling;
    }

    return null;
  }

  function mapRemainingChildren(returnFiber, currentFirstChild) {
    // Add the remaining children to a temporary map so that we can find them by
    // keys quickly. Implicit (null) keys get added to this set with their index
    // instead.
    var existingChildren = new Map();
    var existingChild = currentFirstChild;

    while (existingChild !== null) {
      if (existingChild.key !== null) {
        existingChildren.set(existingChild.key, existingChild);
      } else {
        existingChildren.set(existingChild.index, existingChild);
      }

      existingChild = existingChild.sibling;
    }

    return existingChildren;
  }

  function useFiber(fiber, pendingProps) {
    // We currently set sibling to null and index to 0 here because it is easy
    // to forget to do before returning it. E.g. for the single child case.
    var clone = createWorkInProgress(fiber, pendingProps);
    clone.index = 0;
    clone.sibling = null;
    return clone;
  }

  function placeChild(newFiber, lastPlacedIndex, newIndex) {
    newFiber.index = newIndex;

    if (!shouldTrackSideEffects) {
      // During hydration, the useId algorithm needs to know which fibers are
      // part of a list of children (arrays, iterators).
      newFiber.flags |= Forked;
      return lastPlacedIndex;
    }

    var current = newFiber.alternate;

    if (current !== null) {
      var oldIndex = current.index;

      if (oldIndex < lastPlacedIndex) {
        // This is a move.
        newFiber.flags |= Placement | PlacementDEV;
        return lastPlacedIndex;
      } else {
        // This item can stay in place.
        return oldIndex;
      }
    } else {
      // This is an insertion.
      newFiber.flags |= Placement | PlacementDEV;
      return lastPlacedIndex;
    }
  }

  function placeSingleChild(newFiber) {
    // This is simpler for the single child case. We only need to do a
    // placement for inserting new children.
    if (shouldTrackSideEffects && newFiber.alternate === null) {
      newFiber.flags |= Placement | PlacementDEV;
    }

    return newFiber;
  }

  function updateTextNode(returnFiber, current, textContent, lanes) {
    if (current === null || current.tag !== HostText) {
      // Insert
      var created = createFiberFromText(textContent, returnFiber.mode, lanes);
      created.return = returnFiber;
      return created;
    } else {
      // Update
      var existing = useFiber(current, textContent);
      existing.return = returnFiber;
      return existing;
    }
  }

  function updateElement(returnFiber, current, element, lanes) {
    var elementType = element.type;

    if (elementType === REACT_FRAGMENT_TYPE) {
      return updateFragment(returnFiber, current, element.props.children, lanes, element.key);
    }

    if (current !== null) {
      if (current.elementType === elementType || ( // Keep this check inline so it only runs on the false path:
       false) || // Lazy types should reconcile their resolved type.
      // We need to do this after the Hot Reloading check above,
      // because hot reloading has different semantics than prod because
      // it doesn't resuspend. So we can't let the call below suspend.
      typeof elementType === 'object' && elementType !== null && elementType.$$typeof === REACT_LAZY_TYPE && resolveLazy(elementType) === current.type) {
        // Move based on index
        var existing = useFiber(current, element.props);
        existing.ref = coerceRef(returnFiber, current, element);
        existing.return = returnFiber;

        return existing;
      }
    } // Insert


    var created = createFiberFromElement(element, returnFiber.mode, lanes);
    created.ref = coerceRef(returnFiber, current, element);
    created.return = returnFiber;
    return created;
  }

  function updatePortal(returnFiber, current, portal, lanes) {
    if (current === null || current.tag !== HostPortal || current.stateNode.containerInfo !== portal.containerInfo || current.stateNode.implementation !== portal.implementation) {
      // Insert
      var created = createFiberFromPortal(portal, returnFiber.mode, lanes);
      created.return = returnFiber;
      return created;
    } else {
      // Update
      var existing = useFiber(current, portal.children || []);
      existing.return = returnFiber;
      return existing;
    }
  }

  function updateFragment(returnFiber, current, fragment, lanes, key) {
    if (current === null || current.tag !== Fragment) {
      // Insert
      var created = createFiberFromFragment(fragment, returnFiber.mode, lanes, key);
      created.return = returnFiber;
      return created;
    } else {
      // Update
      var existing = useFiber(current, fragment);
      existing.return = returnFiber;
      return existing;
    }
  }

  function createChild(returnFiber, newChild, lanes) {
    if (typeof newChild === 'string' && newChild !== '' || typeof newChild === 'number') {
      // Text nodes don't have keys. If the previous node is implicitly keyed
      // we can continue to replace it without aborting even if it is not a text
      // node.
      var created = createFiberFromText('' + newChild, returnFiber.mode, lanes);
      created.return = returnFiber;
      return created;
    }

    if (typeof newChild === 'object' && newChild !== null) {
      switch (newChild.$$typeof) {
        case REACT_ELEMENT_TYPE:
          {
            var _created = createFiberFromElement(newChild, returnFiber.mode, lanes);

            _created.ref = coerceRef(returnFiber, null, newChild);
            _created.return = returnFiber;
            return _created;
          }

        case REACT_PORTAL_TYPE:
          {
            var _created2 = createFiberFromPortal(newChild, returnFiber.mode, lanes);

            _created2.return = returnFiber;
            return _created2;
          }

        case REACT_LAZY_TYPE:
          {
            var payload = newChild._payload;
            var init = newChild._init;
            return createChild(returnFiber, init(payload), lanes);
          }
      }

      if (isArray(newChild) || getIteratorFn(newChild)) {
        var _created3 = createFiberFromFragment(newChild, returnFiber.mode, lanes, null);

        _created3.return = returnFiber;
        return _created3;
      }

      throwOnInvalidObjectType(returnFiber, newChild);
    }

    return null;
  }

  function updateSlot(returnFiber, oldFiber, newChild, lanes) {
    // Update the fiber if the keys match, otherwise return null.
    var key = oldFiber !== null ? oldFiber.key : null;

    if (typeof newChild === 'string' && newChild !== '' || typeof newChild === 'number') {
      // Text nodes don't have keys. If the previous node is implicitly keyed
      // we can continue to replace it without aborting even if it is not a text
      // node.
      if (key !== null) {
        return null;
      }

      return updateTextNode(returnFiber, oldFiber, '' + newChild, lanes);
    }

    if (typeof newChild === 'object' && newChild !== null) {
      switch (newChild.$$typeof) {
        case REACT_ELEMENT_TYPE:
          {
            if (newChild.key === key) {
              return updateElement(returnFiber, oldFiber, newChild, lanes);
            } else {
              return null;
            }
          }

        case REACT_PORTAL_TYPE:
          {
            if (newChild.key === key) {
              return updatePortal(returnFiber, oldFiber, newChild, lanes);
            } else {
              return null;
            }
          }

        case REACT_LAZY_TYPE:
          {
            var payload = newChild._payload;
            var init = newChild._init;
            return updateSlot(returnFiber, oldFiber, init(payload), lanes);
          }
      }

      if (isArray(newChild) || getIteratorFn(newChild)) {
        if (key !== null) {
          return null;
        }

        return updateFragment(returnFiber, oldFiber, newChild, lanes, null);
      }

      throwOnInvalidObjectType(returnFiber, newChild);
    }

    return null;
  }

  function updateFromMap(existingChildren, returnFiber, newIdx, newChild, lanes) {
    if (typeof newChild === 'string' && newChild !== '' || typeof newChild === 'number') {
      // Text nodes don't have keys, so we neither have to check the old nor
      // new node for the key. If both are text nodes, they match.
      var matchedFiber = existingChildren.get(newIdx) || null;
      return updateTextNode(returnFiber, matchedFiber, '' + newChild, lanes);
    }

    if (typeof newChild === 'object' && newChild !== null) {
      switch (newChild.$$typeof) {
        case REACT_ELEMENT_TYPE:
          {
            var _matchedFiber = existingChildren.get(newChild.key === null ? newIdx : newChild.key) || null;

            return updateElement(returnFiber, _matchedFiber, newChild, lanes);
          }

        case REACT_PORTAL_TYPE:
          {
            var _matchedFiber2 = existingChildren.get(newChild.key === null ? newIdx : newChild.key) || null;

            return updatePortal(returnFiber, _matchedFiber2, newChild, lanes);
          }

        case REACT_LAZY_TYPE:
          var payload = newChild._payload;
          var init = newChild._init;
          return updateFromMap(existingChildren, returnFiber, newIdx, init(payload), lanes);
      }

      if (isArray(newChild) || getIteratorFn(newChild)) {
        var _matchedFiber3 = existingChildren.get(newIdx) || null;

        return updateFragment(returnFiber, _matchedFiber3, newChild, lanes, null);
      }

      throwOnInvalidObjectType(returnFiber, newChild);
    }

    return null;
  }

  function reconcileChildrenArray(returnFiber, currentFirstChild, newChildren, lanes) {

    var resultingFirstChild = null;
    var previousNewFiber = null;
    var oldFiber = currentFirstChild;
    var lastPlacedIndex = 0;
    var newIdx = 0;
    var nextOldFiber = null;

    for (; oldFiber !== null && newIdx < newChildren.length; newIdx++) {
      if (oldFiber.index > newIdx) {
        nextOldFiber = oldFiber;
        oldFiber = null;
      } else {
        nextOldFiber = oldFiber.sibling;
      }

      var newFiber = updateSlot(returnFiber, oldFiber, newChildren[newIdx], lanes);

      if (newFiber === null) {
        // TODO: This breaks on empty slots like null children. That's
        // unfortunate because it triggers the slow path all the time. We need
        // a better way to communicate whether this was a miss or null,
        // boolean, undefined, etc.
        if (oldFiber === null) {
          oldFiber = nextOldFiber;
        }

        break;
      }

      if (shouldTrackSideEffects) {
        if (oldFiber && newFiber.alternate === null) {
          // We matched the slot, but we didn't reuse the existing fiber, so we
          // need to delete the existing child.
          deleteChild(returnFiber, oldFiber);
        }
      }

      lastPlacedIndex = placeChild(newFiber, lastPlacedIndex, newIdx);

      if (previousNewFiber === null) {
        // TODO: Move out of the loop. This only happens for the first run.
        resultingFirstChild = newFiber;
      } else {
        // TODO: Defer siblings if we're not at the right index for this slot.
        // I.e. if we had null values before, then we want to defer this
        // for each null value. However, we also don't want to call updateSlot
        // with the previous one.
        previousNewFiber.sibling = newFiber;
      }

      previousNewFiber = newFiber;
      oldFiber = nextOldFiber;
    }

    if (newIdx === newChildren.length) {
      // We've reached the end of the new children. We can delete the rest.
      deleteRemainingChildren(returnFiber, oldFiber);

      if (getIsHydrating()) {
        var numberOfForks = newIdx;
        pushTreeFork(returnFiber, numberOfForks);
      }

      return resultingFirstChild;
    }

    if (oldFiber === null) {
      // If we don't have any more existing children we can choose a fast path
      // since the rest will all be insertions.
      for (; newIdx < newChildren.length; newIdx++) {
        var _newFiber = createChild(returnFiber, newChildren[newIdx], lanes);

        if (_newFiber === null) {
          continue;
        }

        lastPlacedIndex = placeChild(_newFiber, lastPlacedIndex, newIdx);

        if (previousNewFiber === null) {
          // TODO: Move out of the loop. This only happens for the first run.
          resultingFirstChild = _newFiber;
        } else {
          previousNewFiber.sibling = _newFiber;
        }

        previousNewFiber = _newFiber;
      }

      if (getIsHydrating()) {
        var _numberOfForks = newIdx;
        pushTreeFork(returnFiber, _numberOfForks);
      }

      return resultingFirstChild;
    } // Add all children to a key map for quick lookups.


    var existingChildren = mapRemainingChildren(returnFiber, oldFiber); // Keep scanning and use the map to restore deleted items as moves.

    for (; newIdx < newChildren.length; newIdx++) {
      var _newFiber2 = updateFromMap(existingChildren, returnFiber, newIdx, newChildren[newIdx], lanes);

      if (_newFiber2 !== null) {
        if (shouldTrackSideEffects) {
          if (_newFiber2.alternate !== null) {
            // The new fiber is a work in progress, but if there exists a
            // current, that means that we reused the fiber. We need to delete
            // it from the child list so that we don't add it to the deletion
            // list.
            existingChildren.delete(_newFiber2.key === null ? newIdx : _newFiber2.key);
          }
        }

        lastPlacedIndex = placeChild(_newFiber2, lastPlacedIndex, newIdx);

        if (previousNewFiber === null) {
          resultingFirstChild = _newFiber2;
        } else {
          previousNewFiber.sibling = _newFiber2;
        }

        previousNewFiber = _newFiber2;
      }
    }

    if (shouldTrackSideEffects) {
      // Any existing children that weren't consumed above were deleted. We need
      // to add them to the deletion list.
      existingChildren.forEach(function (child) {
        return deleteChild(returnFiber, child);
      });
    }

    if (getIsHydrating()) {
      var _numberOfForks2 = newIdx;
      pushTreeFork(returnFiber, _numberOfForks2);
    }

    return resultingFirstChild;
  }

  function reconcileChildrenIterator(returnFiber, currentFirstChild, newChildrenIterable, lanes) {
    // This is the same implementation as reconcileChildrenArray(),
    // but using the iterator instead.
    var iteratorFn = getIteratorFn(newChildrenIterable);

    if (typeof iteratorFn !== 'function') {
      throw new Error('An object is not an iterable. This error is likely caused by a bug in ' + 'React. Please file an issue.');
    }

    var newChildren = iteratorFn.call(newChildrenIterable);

    if (newChildren == null) {
      throw new Error('An iterable object provided no iterator.');
    }

    var resultingFirstChild = null;
    var previousNewFiber = null;
    var oldFiber = currentFirstChild;
    var lastPlacedIndex = 0;
    var newIdx = 0;
    var nextOldFiber = null;
    var step = newChildren.next();

    for (; oldFiber !== null && !step.done; newIdx++, step = newChildren.next()) {
      if (oldFiber.index > newIdx) {
        nextOldFiber = oldFiber;
        oldFiber = null;
      } else {
        nextOldFiber = oldFiber.sibling;
      }

      var newFiber = updateSlot(returnFiber, oldFiber, step.value, lanes);

      if (newFiber === null) {
        // TODO: This breaks on empty slots like null children. That's
        // unfortunate because it triggers the slow path all the time. We need
        // a better way to communicate whether this was a miss or null,
        // boolean, undefined, etc.
        if (oldFiber === null) {
          oldFiber = nextOldFiber;
        }

        break;
      }

      if (shouldTrackSideEffects) {
        if (oldFiber && newFiber.alternate === null) {
          // We matched the slot, but we didn't reuse the existing fiber, so we
          // need to delete the existing child.
          deleteChild(returnFiber, oldFiber);
        }
      }

      lastPlacedIndex = placeChild(newFiber, lastPlacedIndex, newIdx);

      if (previousNewFiber === null) {
        // TODO: Move out of the loop. This only happens for the first run.
        resultingFirstChild = newFiber;
      } else {
        // TODO: Defer siblings if we're not at the right index for this slot.
        // I.e. if we had null values before, then we want to defer this
        // for each null value. However, we also don't want to call updateSlot
        // with the previous one.
        previousNewFiber.sibling = newFiber;
      }

      previousNewFiber = newFiber;
      oldFiber = nextOldFiber;
    }

    if (step.done) {
      // We've reached the end of the new children. We can delete the rest.
      deleteRemainingChildren(returnFiber, oldFiber);

      if (getIsHydrating()) {
        var numberOfForks = newIdx;
        pushTreeFork(returnFiber, numberOfForks);
      }

      return resultingFirstChild;
    }

    if (oldFiber === null) {
      // If we don't have any more existing children we can choose a fast path
      // since the rest will all be insertions.
      for (; !step.done; newIdx++, step = newChildren.next()) {
        var _newFiber3 = createChild(returnFiber, step.value, lanes);

        if (_newFiber3 === null) {
          continue;
        }

        lastPlacedIndex = placeChild(_newFiber3, lastPlacedIndex, newIdx);

        if (previousNewFiber === null) {
          // TODO: Move out of the loop. This only happens for the first run.
          resultingFirstChild = _newFiber3;
        } else {
          previousNewFiber.sibling = _newFiber3;
        }

        previousNewFiber = _newFiber3;
      }

      if (getIsHydrating()) {
        var _numberOfForks3 = newIdx;
        pushTreeFork(returnFiber, _numberOfForks3);
      }

      return resultingFirstChild;
    } // Add all children to a key map for quick lookups.


    var existingChildren = mapRemainingChildren(returnFiber, oldFiber); // Keep scanning and use the map to restore deleted items as moves.

    for (; !step.done; newIdx++, step = newChildren.next()) {
      var _newFiber4 = updateFromMap(existingChildren, returnFiber, newIdx, step.value, lanes);

      if (_newFiber4 !== null) {
        if (shouldTrackSideEffects) {
          if (_newFiber4.alternate !== null) {
            // The new fiber is a work in progress, but if there exists a
            // current, that means that we reused the fiber. We need to delete
            // it from the child list so that we don't add it to the deletion
            // list.
            existingChildren.delete(_newFiber4.key === null ? newIdx : _newFiber4.key);
          }
        }

        lastPlacedIndex = placeChild(_newFiber4, lastPlacedIndex, newIdx);

        if (previousNewFiber === null) {
          resultingFirstChild = _newFiber4;
        } else {
          previousNewFiber.sibling = _newFiber4;
        }

        previousNewFiber = _newFiber4;
      }
    }

    if (shouldTrackSideEffects) {
      // Any existing children that weren't consumed above were deleted. We need
      // to add them to the deletion list.
      existingChildren.forEach(function (child) {
        return deleteChild(returnFiber, child);
      });
    }

    if (getIsHydrating()) {
      var _numberOfForks4 = newIdx;
      pushTreeFork(returnFiber, _numberOfForks4);
    }

    return resultingFirstChild;
  }

  function reconcileSingleTextNode(returnFiber, currentFirstChild, textContent, lanes) {
    // There's no need to check for keys on text nodes since we don't have a
    // way to define them.
    if (currentFirstChild !== null && currentFirstChild.tag === HostText) {
      // We already have an existing node so let's just update it and delete
      // the rest.
      deleteRemainingChildren(returnFiber, currentFirstChild.sibling);
      var existing = useFiber(currentFirstChild, textContent);
      existing.return = returnFiber;
      return existing;
    } // The existing first child is not a text node so we need to create one
    // and delete the existing ones.


    deleteRemainingChildren(returnFiber, currentFirstChild);
    var created = createFiberFromText(textContent, returnFiber.mode, lanes);
    created.return = returnFiber;
    return created;
  }

  function reconcileSingleElement(returnFiber, currentFirstChild, element, lanes) {
    var key = element.key;
    var child = currentFirstChild;

    while (child !== null) {
      // TODO: If key === null and child.key === null, then this only applies to
      // the first item in the list.
      if (child.key === key) {
        var elementType = element.type;

        if (elementType === REACT_FRAGMENT_TYPE) {
          if (child.tag === Fragment) {
            deleteRemainingChildren(returnFiber, child.sibling);
            var existing = useFiber(child, element.props.children);
            existing.return = returnFiber;

            return existing;
          }
        } else {
          if (child.elementType === elementType || ( // Keep this check inline so it only runs on the false path:
           false) || // Lazy types should reconcile their resolved type.
          // We need to do this after the Hot Reloading check above,
          // because hot reloading has different semantics than prod because
          // it doesn't resuspend. So we can't let the call below suspend.
          typeof elementType === 'object' && elementType !== null && elementType.$$typeof === REACT_LAZY_TYPE && resolveLazy(elementType) === child.type) {
            deleteRemainingChildren(returnFiber, child.sibling);

            var _existing = useFiber(child, element.props);

            _existing.ref = coerceRef(returnFiber, child, element);
            _existing.return = returnFiber;

            return _existing;
          }
        } // Didn't match.


        deleteRemainingChildren(returnFiber, child);
        break;
      } else {
        deleteChild(returnFiber, child);
      }

      child = child.sibling;
    }

    if (element.type === REACT_FRAGMENT_TYPE) {
      var created = createFiberFromFragment(element.props.children, returnFiber.mode, lanes, element.key);
      created.return = returnFiber;
      return created;
    } else {
      var _created4 = createFiberFromElement(element, returnFiber.mode, lanes);

      _created4.ref = coerceRef(returnFiber, currentFirstChild, element);
      _created4.return = returnFiber;
      return _created4;
    }
  }

  function reconcileSinglePortal(returnFiber, currentFirstChild, portal, lanes) {
    var key = portal.key;
    var child = currentFirstChild;

    while (child !== null) {
      // TODO: If key === null and child.key === null, then this only applies to
      // the first item in the list.
      if (child.key === key) {
        if (child.tag === HostPortal && child.stateNode.containerInfo === portal.containerInfo && child.stateNode.implementation === portal.implementation) {
          deleteRemainingChildren(returnFiber, child.sibling);
          var existing = useFiber(child, portal.children || []);
          existing.return = returnFiber;
          return existing;
        } else {
          deleteRemainingChildren(returnFiber, child);
          break;
        }
      } else {
        deleteChild(returnFiber, child);
      }

      child = child.sibling;
    }

    var created = createFiberFromPortal(portal, returnFiber.mode, lanes);
    created.return = returnFiber;
    return created;
  } // This API will tag the children with the side-effect of the reconciliation
  // itself. They will be added to the side-effect list as we pass through the
  // children and the parent.


  function reconcileChildFibers(returnFiber, currentFirstChild, newChild, lanes) {
    // This function is not recursive.
    // If the top level item is an array, we treat it as a set of children,
    // not as a fragment. Nested arrays on the other hand will be treated as
    // fragment nodes. Recursion happens at the normal flow.
    // Handle top level unkeyed fragments as if they were arrays.
    // This leads to an ambiguity between <>{[...]}</> and <>...</>.
    // We treat the ambiguous cases above the same.
    var isUnkeyedTopLevelFragment = typeof newChild === 'object' && newChild !== null && newChild.type === REACT_FRAGMENT_TYPE && newChild.key === null;

    if (isUnkeyedTopLevelFragment) {
      newChild = newChild.props.children;
    } // Handle object types


    if (typeof newChild === 'object' && newChild !== null) {
      switch (newChild.$$typeof) {
        case REACT_ELEMENT_TYPE:
          return placeSingleChild(reconcileSingleElement(returnFiber, currentFirstChild, newChild, lanes));

        case REACT_PORTAL_TYPE:
          return placeSingleChild(reconcileSinglePortal(returnFiber, currentFirstChild, newChild, lanes));

        case REACT_LAZY_TYPE:
          var payload = newChild._payload;
          var init = newChild._init; // TODO: This function is supposed to be non-recursive.

          return reconcileChildFibers(returnFiber, currentFirstChild, init(payload), lanes);
      }

      if (isArray(newChild)) {
        return reconcileChildrenArray(returnFiber, currentFirstChild, newChild, lanes);
      }

      if (getIteratorFn(newChild)) {
        return reconcileChildrenIterator(returnFiber, currentFirstChild, newChild, lanes);
      }

      throwOnInvalidObjectType(returnFiber, newChild);
    }

    if (typeof newChild === 'string' && newChild !== '' || typeof newChild === 'number') {
      return placeSingleChild(reconcileSingleTextNode(returnFiber, currentFirstChild, '' + newChild, lanes));
    }


    return deleteRemainingChildren(returnFiber, currentFirstChild);
  }

  return reconcileChildFibers;
}

var reconcileChildFibers = createChildReconciler(true);
var mountChildFibers = createChildReconciler(false);
function cloneChildFibers(current, workInProgress) {
  if (current !== null && workInProgress.child !== current.child) {
    throw new Error('Resuming work not yet implemented.');
  }

  if (workInProgress.child === null) {
    return;
  }

  var currentChild = workInProgress.child;
  var newChild = createWorkInProgress(currentChild, currentChild.pendingProps);
  workInProgress.child = newChild;
  newChild.return = workInProgress;

  while (currentChild.sibling !== null) {
    currentChild = currentChild.sibling;
    newChild = newChild.sibling = createWorkInProgress(currentChild, currentChild.pendingProps);
    newChild.return = workInProgress;
  }

  newChild.sibling = null;
} // Reset a workInProgress child set to prepare it for a second pass.

function resetChildFibers(workInProgress, lanes) {
  var child = workInProgress.child;

  while (child !== null) {
    resetWorkInProgress(child, lanes);
    child = child.sibling;
  }
}

// TODO: This isn't being used yet, but it's intended to replace the
// InvisibleParentContext that is currently managed by SuspenseContext.

var currentTreeHiddenStackCursor = createCursor(null);
var prevRenderLanesStackCursor = createCursor(NoLanes);
function pushHiddenContext(fiber, context) {
  var prevRenderLanes = getRenderLanes();
  push(prevRenderLanesStackCursor, prevRenderLanes);
  push(currentTreeHiddenStackCursor, context); // When rendering a subtree that's currently hidden, we must include all
  // lanes that would have rendered if the hidden subtree hadn't been deferred.
  // That is, in order to reveal content from hidden -> visible, we must commit
  // all the updates that we skipped when we originally hid the tree.

  setRenderLanes(mergeLanes(prevRenderLanes, context.baseLanes));
}
function reuseHiddenContextOnStack(fiber) {
  // This subtree is not currently hidden, so we don't need to add any lanes
  // to the render lanes. But we still need to push something to avoid a
  // context mismatch. Reuse the existing context on the stack.
  push(prevRenderLanesStackCursor, getRenderLanes());
  push(currentTreeHiddenStackCursor, currentTreeHiddenStackCursor.current);
}
function popHiddenContext(fiber) {
  // Restore the previous render lanes from the stack
  setRenderLanes(prevRenderLanesStackCursor.current);
  pop(currentTreeHiddenStackCursor);
  pop(prevRenderLanesStackCursor);
}
function isCurrentTreeHidden() {
  return currentTreeHiddenStackCursor.current !== null;
}

// suspends, i.e. it's the nearest `catch` block on the stack.

var suspenseHandlerStackCursor = createCursor(null); // Represents the outermost boundary that is not visible in the current tree.
// Everything above this is the "shell". When this is null, it means we're
// rendering in the shell of the app. If it's non-null, it means we're rendering
// deeper than the shell, inside a new tree that wasn't already visible.
//
// The main way we use this concept is to determine whether showing a fallback
// would result in a desirable or undesirable loading state. Activing a fallback
// in the shell is considered an undersirable loading state, because it would
// mean hiding visible (albeit stale) content in the current tree — we prefer to
// show the stale content, rather than switch to a fallback. But showing a
// fallback in a new tree is fine, because there's no stale content to
// prefer instead.

var shellBoundary = null;
function getShellBoundary() {
  return shellBoundary;
}
function pushPrimaryTreeSuspenseHandler(handler) {
  // TODO: Pass as argument
  var current = handler.alternate;
  var props = handler.pendingProps; // Experimental feature: Some Suspense boundaries are marked as having an
  // to push a nested Suspense handler, because it will get replaced by the
  // outer fallback, anyway. Consider this as a future optimization.


  push(suspenseHandlerStackCursor, handler);

  if (shellBoundary === null) {
    if (current === null || isCurrentTreeHidden()) {
      // This boundary is not visible in the current UI.
      shellBoundary = handler;
    } else {
      var prevState = current.memoizedState;

      if (prevState !== null) {
        // This boundary is showing a fallback in the current UI.
        shellBoundary = handler;
      }
    }
  }
}
function pushFallbackTreeSuspenseHandler(fiber) {
  // We're about to render the fallback. If something in the fallback suspends,
  // it's akin to throwing inside of a `catch` block. This boundary should not
  // capture. Reuse the existing handler on the stack.
  reuseSuspenseHandlerOnStack();
}
function pushOffscreenSuspenseHandler(fiber) {
  if (fiber.tag === OffscreenComponent) {
    push(suspenseHandlerStackCursor, fiber);

    if (shellBoundary !== null) ; else {
      var current = fiber.alternate;

      if (current !== null) {
        var prevState = current.memoizedState;

        if (prevState !== null) {
          // This is the first boundary in the stack that's already showing
          // a fallback. So everything outside is considered the shell.
          shellBoundary = fiber;
        }
      }
    }
  } else {
    // This is a LegacyHidden component.
    reuseSuspenseHandlerOnStack();
  }
}
function reuseSuspenseHandlerOnStack(fiber) {
  push(suspenseHandlerStackCursor, getSuspenseHandler());
}
function getSuspenseHandler() {
  return suspenseHandlerStackCursor.current;
}
function popSuspenseHandler(fiber) {
  pop(suspenseHandlerStackCursor);

  if (shellBoundary === fiber) {
    // Popping back into the shell.
    shellBoundary = null;
  }
} // SuspenseList context
// TODO: Move to a separate module? We may change the SuspenseList
// implementation to hide/show in the commit phase, anyway.

var DefaultSuspenseContext = 0;
var SubtreeSuspenseContextMask = 1; // ForceSuspenseFallback can be used by SuspenseList to force newly added
// items into their fallback state during one of the render passes.

var ForceSuspenseFallback = 2;
var suspenseStackCursor = createCursor(DefaultSuspenseContext);
function hasSuspenseListContext(parentContext, flag) {
  return (parentContext & flag) !== 0;
}
function setDefaultShallowSuspenseListContext(parentContext) {
  return parentContext & SubtreeSuspenseContextMask;
}
function setShallowSuspenseListContext(parentContext, shallowContext) {
  return parentContext & SubtreeSuspenseContextMask | shallowContext;
}
function pushSuspenseListContext(fiber, newContext) {
  push(suspenseStackCursor, newContext);
}
function popSuspenseListContext(fiber) {
  pop(suspenseStackCursor);
}

// A non-null SuspenseState means that it is blocked for one reason or another.
// - A non-null dehydrated field means it's blocked pending hydration.
//   - A non-null dehydrated field can use isSuspenseInstancePending or
//     isSuspenseInstanceFallback to query the reason for being dehydrated.
// - A null dehydrated field means it's blocked by something suspending and
//   we're currently showing a fallback instead.

function findFirstSuspended(row) {
  var node = row;

  while (node !== null) {
    if (node.tag === SuspenseComponent) {
      var state = node.memoizedState;

      if (state !== null) {
        var dehydrated = state.dehydrated;

        if (dehydrated === null || isSuspenseInstancePending(dehydrated) || isSuspenseInstanceFallback(dehydrated)) {
          return node;
        }
      }
    } else if (node.tag === SuspenseListComponent && // revealOrder undefined can't be trusted because it don't
    // keep track of whether it suspended or not.
    node.memoizedProps.revealOrder !== undefined) {
      var didSuspend = (node.flags & DidCapture) !== NoFlags;

      if (didSuspend) {
        return node;
      }
    } else if (node.child !== null) {
      node.child.return = node;
      node = node.child;
      continue;
    }

    if (node === row) {
      return null;
    }

    while (node.sibling === null) {
      if (node.return === null || node.return === row) {
        return null;
      }

      node = node.return;
    }

    node.sibling.return = node.return;
    node = node.sibling;
  }

  return null;
}

var NoFlags$1 =
/*   */
0; // Represents whether effect should fire.

var HasEffect =
/* */
1; // Represents the phase in which the effect (not the clean-up) fires.

var Insertion =
/* */
2;
var Layout =
/*    */
4;
var Passive$1 =
/*   */
8;

// and should be reset before starting a new render.
// This tracks which mutable sources need to be reset after a render.

var workInProgressSources = [];
function resetWorkInProgressVersions() {
  for (var i = 0; i < workInProgressSources.length; i++) {
    var mutableSource = workInProgressSources[i];

    if (isPrimaryRenderer) {
      mutableSource._workInProgressVersionPrimary = null;
    } else {
      mutableSource._workInProgressVersionSecondary = null;
    }
  }

  workInProgressSources.length = 0;
}
// This ensures that the version used for server rendering matches the one
// that is eventually read during hydration.
// If they don't match there's a potential tear and a full deopt render is required.

function registerMutableSourceForHydration(root, mutableSource) {
  var getVersion = mutableSource._getVersion;
  var version = getVersion(mutableSource._source); // TODO Clear this data once all pending hydration work is finished.
  // Retaining it forever may interfere with GC.

  if (root.mutableSourceEagerHydrationData == null) {
    root.mutableSourceEagerHydrationData = [mutableSource, version];
  } else {
    root.mutableSourceEagerHydrationData.push(mutableSource, version);
  }
}

var ReactCurrentActQueue = ReactSharedInternals.ReactCurrentActQueue; // An error that is thrown (e.g. by `use`) to trigger Suspense. If we
// detect this is caught by userspace, we'll log a warning in development.

var SuspenseException = new Error("Suspense Exception: This is not a real error! It's an implementation " + 'detail of `use` to interrupt the current render. You must either ' + 'rethrow it immediately, or move the `use` call outside of the ' + '`try/catch` block. Capturing without rethrowing will lead to ' + 'unexpected behavior.\n\n' + 'To handle async errors, wrap your component in an error boundary, or ' + "call the promise's `.catch` method and pass the result to `use`");
function createThenableState() {
  // The ThenableState is created the first time a component suspends. If it
  // suspends again, we'll reuse the same state.
  return [];
}
function isThenableResolved(thenable) {
  var status = thenable.status;
  return status === 'fulfilled' || status === 'rejected';
}

function noop() {}

function trackUsedThenable(thenableState, thenable, index) {

  var previous = thenableState[index];

  if (previous === undefined) {
    thenableState.push(thenable);
  } else {
    if (previous !== thenable) {
      // Reuse the previous thenable, and drop the new one. We can assume
      // they represent the same value, because components are idempotent.
      // Avoid an unhandled rejection errors for the Promises that we'll
      // intentionally ignore.
      thenable.then(noop, noop);
      thenable = previous;
    }
  } // We use an expando to track the status and result of a thenable so that we
  // can synchronously unwrap the value. Think of this as an extension of the
  // Promise API, or a custom interface that is a superset of Thenable.
  //
  // If the thenable doesn't have a status, set it to "pending" and attach
  // a listener that will update its status and result when it resolves.


  switch (thenable.status) {
    case 'fulfilled':
      {
        var fulfilledValue = thenable.value;
        return fulfilledValue;
      }

    case 'rejected':
      {
        var rejectedError = thenable.reason;
        throw rejectedError;
      }

    default:
      {
        if (typeof thenable.status === 'string') ; else {
          var pendingThenable = thenable;
          pendingThenable.status = 'pending';
          pendingThenable.then(function (fulfilledValue) {
            if (thenable.status === 'pending') {
              var fulfilledThenable = thenable;
              fulfilledThenable.status = 'fulfilled';
              fulfilledThenable.value = fulfilledValue;
            }
          }, function (error) {
            if (thenable.status === 'pending') {
              var rejectedThenable = thenable;
              rejectedThenable.status = 'rejected';
              rejectedThenable.reason = error;
            }
          }); // Check one more time in case the thenable resolved synchronously

          switch (thenable.status) {
            case 'fulfilled':
              {
                var fulfilledThenable = thenable;
                return fulfilledThenable.value;
              }

            case 'rejected':
              {
                var rejectedThenable = thenable;
                throw rejectedThenable.reason;
              }
          }
        } // Suspend.
        //
        // Throwing here is an implementation detail that allows us to unwind the
        // call stack. But we shouldn't allow it to leak into userspace. Throw an
        // opaque placeholder value instead of the actual thenable. If it doesn't
        // get captured by the work loop, log a warning, because that means
        // something in userspace must have caught it.


        suspendedThenable = thenable;

        throw SuspenseException;
      }
  }
} // This is used to track the actual thenable that suspended so it can be
// passed to the rest of the Suspense implementation — which, for historical
// reasons, expects to receive a thenable.

var suspendedThenable = null;
function getSuspendedThenable() {
  // This is called right after `use` suspends by throwing an exception. `use`
  // throws an opaque value instead of the thenable itself so that it can't be
  // caught in userspace. Then the work loop accesses the actual thenable using
  // this function.
  if (suspendedThenable === null) {
    throw new Error('Expected a suspended thenable. This is a bug in React. Please file ' + 'an issue.');
  }

  var thenable = suspendedThenable;
  suspendedThenable = null;

  return thenable;
}

var ReactCurrentDispatcher$1 = ReactSharedInternals.ReactCurrentDispatcher,
    ReactCurrentBatchConfig = ReactSharedInternals.ReactCurrentBatchConfig;


var renderLanes = NoLanes; // The work-in-progress fiber. I've named it differently to distinguish it from
// the work-in-progress hook.

var currentlyRenderingFiber = null; // Hooks are stored as a linked list on the fiber's memoizedState field. The
// current hook list is the list that belongs to the current fiber. The
// work-in-progress hook list is a new list that will be added to the
// work-in-progress fiber.

var currentHook = null;
var workInProgressHook = null; // Whether an update was scheduled at any point during the render phase. This
// does not get reset if we do another render pass; only when we're completely
// finished evaluating this component. This is an optimization so we know
// whether we need to clear render phase updates after a throw.

var didScheduleRenderPhaseUpdate = false; // Where an update was scheduled only during the current render pass. This
// gets reset after each attempt.
// TODO: Maybe there's some way to consolidate this with
// `didScheduleRenderPhaseUpdate`. Or with `numberOfReRenders`.

var didScheduleRenderPhaseUpdateDuringThisPass = false;
var shouldDoubleInvokeUserFnsInHooksDEV = false; // Counts the number of useId hooks in this component.

var localIdCounter = 0; // Counts number of `use`-d thenables

var thenableIndexCounter = 0;
var thenableState = null; // Used for ids that are generated completely client-side (i.e. not during
// hydration). This counter is global, so client ids are not stable across
// render attempts.

var globalClientIdCounter = 0;
var RE_RENDER_LIMIT = 25; // In DEV, this is the name of the currently executing primitive hook

function throwInvalidHookError() {
  throw new Error('Invalid hook call. Hooks can only be called inside of the body of a function component. This could happen for' + ' one of the following reasons:\n' + '1. You might have mismatching versions of React and the renderer (such as React DOM)\n' + '2. You might be breaking the Rules of Hooks\n' + '3. You might have more than one copy of React in the same app\n' + 'See https://reactjs.org/link/invalid-hook-call for tips about how to debug and fix this problem.');
}

function areHookInputsEqual(nextDeps, prevDeps) {

  if (prevDeps === null) {

    return false;
  }


  for (var i = 0; i < prevDeps.length && i < nextDeps.length; i++) {
    // $FlowFixMe[incompatible-use] found when upgrading Flow
    if (objectIs(nextDeps[i], prevDeps[i])) {
      continue;
    }

    return false;
  }

  return true;
}

function renderWithHooks(current, workInProgress, Component, props, secondArg, nextRenderLanes) {
  renderLanes = nextRenderLanes;
  currentlyRenderingFiber = workInProgress;

  workInProgress.memoizedState = null;
  workInProgress.updateQueue = null;
  workInProgress.lanes = NoLanes; // The following should have already been reset
  // currentHook = null;
  // workInProgressHook = null;
  // didScheduleRenderPhaseUpdate = false;
  // localIdCounter = 0;
  // thenableIndexCounter = 0;
  // thenableState = null;
  // TODO Warn if no hooks are used at all during mount, then some are used during update.
  // Currently we will identify the update render as a mount because memoizedState === null.
  // This is tricky because it's valid for certain types of components (e.g. React.lazy)
  // Using memoizedState to differentiate between mount/update only works if at least one stateful hook is used.
  // Non-stateful hooks (e.g. context) don't get added to memoizedState,
  // so memoizedState would be null during updates and mounts.

  {
    ReactCurrentDispatcher$1.current = current === null || current.memoizedState === null ? HooksDispatcherOnMount : HooksDispatcherOnUpdate;
  } // In Strict Mode, during development, user functions are double invoked to
  // help detect side effects. The logic for how this is implemented for in
  // hook components is a bit complex so let's break it down.
  //
  // We will invoke the entire component function twice. However, during the
  // second invocation of the component, the hook state from the first
  // invocation will be reused. That means things like `useMemo` functions won't
  // run again, because the deps will match and the memoized result will
  // be reused.
  //
  // We want memoized functions to run twice, too, so account for this, user
  // functions are double invoked during the *first* invocation of the component
  // function, and are *not* double invoked during the second incovation:
  //
  // - First execution of component function: user functions are double invoked
  // - Second execution of component function (in Strict Mode, during
  //   development): user functions are not double invoked.
  //
  // This is intentional for a few reasons; most importantly, it's because of
  // how `use` works when something suspends: it reuses the promise that was
  // passed during the first attempt. This is itself a form of memoization.
  // We need to be able to memoize the reactive inputs to the `use` call using
  // a hook (i.e. `useMemo`), which means, the reactive inputs to `use` must
  // come from the same component invocation as the output.
  //
  // There are plenty of tests to ensure this behavior is correct.


  var shouldDoubleRenderDEV = false  ;
  shouldDoubleInvokeUserFnsInHooksDEV = shouldDoubleRenderDEV;
  var children = Component(props, secondArg);
  shouldDoubleInvokeUserFnsInHooksDEV = false; // Check if there was a render phase update

  if (didScheduleRenderPhaseUpdateDuringThisPass) {
    // Keep rendering until the component stabilizes (there are no more render
    // phase updates).
    children = renderWithHooksAgain(workInProgress, Component, props, secondArg);
  }

  finishRenderingHooks();
  return children;
}

function finishRenderingHooks(current, workInProgress) {
  // We can assume the previous dispatcher is always this one, since we set it
  // at the beginning of the render phase and there's no re-entrance.
  ReactCurrentDispatcher$1.current = ContextOnlyDispatcher;
  // hookTypesDev could catch more cases (e.g. context) but only in DEV bundles.


  var didRenderTooFewHooks = currentHook !== null && currentHook.next !== null;
  renderLanes = NoLanes;
  currentlyRenderingFiber = null;
  currentHook = null;
  workInProgressHook = null;

  didScheduleRenderPhaseUpdate = false; // This is reset by checkDidRenderIdHook
  // localIdCounter = 0;

  thenableIndexCounter = 0;
  thenableState = null;

  if (didRenderTooFewHooks) {
    throw new Error('Rendered fewer hooks than expected. This may be caused by an accidental ' + 'early return statement.');
  }
}

function replaySuspendedComponentWithHooks(current, workInProgress, Component, props, secondArg) {

  var children = renderWithHooksAgain(workInProgress, Component, props, secondArg);
  finishRenderingHooks();
  return children;
}

function renderWithHooksAgain(workInProgress, Component, props, secondArg) {
  // This is used to perform another render pass. It's used when setState is
  // called during render, and for double invoking components in Strict Mode
  // during development.
  //
  // The state from the previous pass is reused whenever possible. So, state
  // updates that were already processed are not processed again, and memoized
  // functions (`useMemo`) are not invoked again.
  //
  // Keep rendering in a loop for as long as render phase updates continue to
  // be scheduled. Use a counter to prevent infinite loops.
  var numberOfReRenders = 0;
  var children;

  do {
    didScheduleRenderPhaseUpdateDuringThisPass = false;
    thenableIndexCounter = 0;

    if (numberOfReRenders >= RE_RENDER_LIMIT) {
      throw new Error('Too many re-renders. React limits the number of renders to prevent ' + 'an infinite loop.');
    }

    numberOfReRenders += 1;


    currentHook = null;
    workInProgressHook = null;
    workInProgress.updateQueue = null;

    ReactCurrentDispatcher$1.current =  HooksDispatcherOnRerender;
    children = Component(props, secondArg);
  } while (didScheduleRenderPhaseUpdateDuringThisPass);

  return children;
}

function checkDidRenderIdHook() {
  // This should be called immediately after every renderWithHooks call.
  // Conceptually, it's part of the return value of renderWithHooks; it's only a
  // separate function to avoid using an array tuple.
  var didRenderIdHook = localIdCounter !== 0;
  localIdCounter = 0;
  return didRenderIdHook;
}
function bailoutHooks(current, workInProgress, lanes) {
  workInProgress.updateQueue = current.updateQueue; // TODO: Don't need to reset the flags here, because they're reset in the
  // complete phase (bubbleProperties).

  {
    workInProgress.flags &= ~(Passive | Update);
  }

  current.lanes = removeLanes(current.lanes, lanes);
}
function resetHooksAfterThrow() {
  // This is called immediaetly after a throw. It shouldn't reset the entire
  // module state, because the work loop might decide to replay the component
  // again without rewinding.
  //
  // It should only reset things like the current dispatcher, to prevent hooks
  // from being called outside of a component.
  // We can assume the previous dispatcher is always this one, since we set it
  // at the beginning of the render phase and there's no re-entrance.
  ReactCurrentDispatcher$1.current = ContextOnlyDispatcher;
}
function resetHooksOnUnwind() {
  if (didScheduleRenderPhaseUpdate) {
    // There were render phase updates. These are only valid for this render
    // phase, which we are now aborting. Remove the updates from the queues so
    // they do not persist to the next render. Do not remove updates from hooks
    // that weren't processed.
    //
    // Only reset the updates from the queue if it has a clone. If it does
    // not have a clone, that means it wasn't processed, and the updates were
    // scheduled before we entered the render phase.
    var hook = currentlyRenderingFiber.memoizedState;

    while (hook !== null) {
      var queue = hook.queue;

      if (queue !== null) {
        queue.pending = null;
      }

      hook = hook.next;
    }

    didScheduleRenderPhaseUpdate = false;
  }

  renderLanes = NoLanes;
  currentlyRenderingFiber = null;
  currentHook = null;
  workInProgressHook = null;

  didScheduleRenderPhaseUpdateDuringThisPass = false;
  localIdCounter = 0;
  thenableIndexCounter = 0;
  thenableState = null;
}

function mountWorkInProgressHook() {
  var hook = {
    memoizedState: null,
    baseState: null,
    baseQueue: null,
    queue: null,
    next: null
  };

  if (workInProgressHook === null) {
    // This is the first hook in the list
    currentlyRenderingFiber.memoizedState = workInProgressHook = hook;
  } else {
    // Append to the end of the list
    workInProgressHook = workInProgressHook.next = hook;
  }

  return workInProgressHook;
}

function updateWorkInProgressHook() {
  // This function is used both for updates and for re-renders triggered by a
  // render phase update. It assumes there is either a current hook we can
  // clone, or a work-in-progress hook from a previous render pass that we can
  // use as a base. When we reach the end of the base list, we must switch to
  // the dispatcher used for mounts.
  var nextCurrentHook;

  if (currentHook === null) {
    var current = currentlyRenderingFiber.alternate;

    if (current !== null) {
      nextCurrentHook = current.memoizedState;
    } else {
      nextCurrentHook = null;
    }
  } else {
    nextCurrentHook = currentHook.next;
  }

  var nextWorkInProgressHook;

  if (workInProgressHook === null) {
    nextWorkInProgressHook = currentlyRenderingFiber.memoizedState;
  } else {
    nextWorkInProgressHook = workInProgressHook.next;
  }

  if (nextWorkInProgressHook !== null) {
    // There's already a work-in-progress. Reuse it.
    workInProgressHook = nextWorkInProgressHook;
    nextWorkInProgressHook = workInProgressHook.next;
    currentHook = nextCurrentHook;
  } else {
    // Clone from the current hook.
    if (nextCurrentHook === null) {
      var currentFiber = currentlyRenderingFiber.alternate;

      if (currentFiber === null) {
        // This is the initial render. This branch is reached when the component
        // suspends, resumes, then renders an additional hook.
        var _newHook = {
          memoizedState: null,
          baseState: null,
          baseQueue: null,
          queue: null,
          next: null
        };
        nextCurrentHook = _newHook;
      } else {
        // This is an update. We should always have a current hook.
        throw new Error('Rendered more hooks than during the previous render.');
      }
    }

    currentHook = nextCurrentHook;
    var newHook = {
      memoizedState: currentHook.memoizedState,
      baseState: currentHook.baseState,
      baseQueue: currentHook.baseQueue,
      queue: currentHook.queue,
      next: null
    };

    if (workInProgressHook === null) {
      // This is the first hook in the list.
      currentlyRenderingFiber.memoizedState = workInProgressHook = newHook;
    } else {
      // Append to the end of the list.
      workInProgressHook = workInProgressHook.next = newHook;
    }
  }

  return workInProgressHook;
} // NOTE: defining two versions of this function to avoid size impact when this feature is disabled.
// Previously this function was inlined, the additional `memoCache` property makes it not inlined.


var createFunctionComponentUpdateQueue;

{
  createFunctionComponentUpdateQueue = function () {
    return {
      lastEffect: null,
      events: null,
      stores: null,
      memoCache: null
    };
  };
}

function use(usable) {
  if (usable !== null && typeof usable === 'object') {
    // $FlowFixMe[method-unbinding]
    if (typeof usable.then === 'function') {
      // This is a thenable.
      var thenable = usable; // Track the position of the thenable within this fiber.

      var index = thenableIndexCounter;
      thenableIndexCounter += 1;

      if (thenableState === null) {
        thenableState = createThenableState();
      }

      return trackUsedThenable(thenableState, thenable, index);
    } else if (usable.$$typeof === REACT_CONTEXT_TYPE || usable.$$typeof === REACT_SERVER_CONTEXT_TYPE) {
      var context = usable;
      return readContext(context);
    }
  } // eslint-disable-next-line react-internal/safe-string-coercion


  throw new Error('An unsupported type was passed to use(): ' + String(usable));
}

function useMemoCache(size) {
  var memoCache = null; // Fast-path, load memo cache from wip fiber if already prepared

  var updateQueue = currentlyRenderingFiber.updateQueue;

  if (updateQueue !== null) {
    memoCache = updateQueue.memoCache;
  } // Otherwise clone from the current fiber


  if (memoCache == null) {
    var current = currentlyRenderingFiber.alternate;

    if (current !== null) {
      var currentUpdateQueue = current.updateQueue;

      if (currentUpdateQueue !== null) {
        var currentMemoCache = currentUpdateQueue.memoCache;

        if (currentMemoCache != null) {
          memoCache = {
            data: currentMemoCache.data.map(function (array) {
              return array.slice();
            }),
            index: 0
          };
        }
      }
    }
  } // Finally fall back to allocating a fresh instance of the cache


  if (memoCache == null) {
    memoCache = {
      data: [],
      index: 0
    };
  }

  if (updateQueue === null) {
    updateQueue = createFunctionComponentUpdateQueue();
    currentlyRenderingFiber.updateQueue = updateQueue;
  }

  updateQueue.memoCache = memoCache;
  var data = memoCache.data[memoCache.index];

  if (data === undefined) {
    data = memoCache.data[memoCache.index] = new Array(size);

    for (var i = 0; i < size; i++) {
      data[i] = REACT_MEMO_CACHE_SENTINEL;
    }
  } else if (data.length !== size) ;

  memoCache.index++;
  return data;
}

function basicStateReducer(state, action) {
  // $FlowFixMe: Flow doesn't like mixed types
  return typeof action === 'function' ? action(state) : action;
}

function mountReducer(reducer, initialArg, init) {
  var hook = mountWorkInProgressHook();
  var initialState;

  if (init !== undefined) {
    initialState = init(initialArg);
  } else {
    initialState = initialArg;
  }

  hook.memoizedState = hook.baseState = initialState;
  var queue = {
    pending: null,
    lanes: NoLanes,
    dispatch: null,
    lastRenderedReducer: reducer,
    lastRenderedState: initialState
  };
  hook.queue = queue;
  var dispatch = queue.dispatch = dispatchReducerAction.bind(null, currentlyRenderingFiber, queue);
  return [hook.memoizedState, dispatch];
}

function updateReducer(reducer, initialArg, init) {
  var hook = updateWorkInProgressHook();
  var queue = hook.queue;

  if (queue === null) {
    throw new Error('Should have a queue. This is likely a bug in React. Please file an issue.');
  }

  queue.lastRenderedReducer = reducer;
  var current = currentHook; // The last rebase update that is NOT part of the base state.

  var baseQueue = current.baseQueue; // The last pending update that hasn't been processed yet.

  var pendingQueue = queue.pending;

  if (pendingQueue !== null) {
    // We have new updates that haven't been processed yet.
    // We'll add them to the base queue.
    if (baseQueue !== null) {
      // Merge the pending queue and the base queue.
      var baseFirst = baseQueue.next;
      var pendingFirst = pendingQueue.next;
      baseQueue.next = pendingFirst;
      pendingQueue.next = baseFirst;
    }

    current.baseQueue = baseQueue = pendingQueue;
    queue.pending = null;
  }

  if (baseQueue !== null) {
    // We have a queue to process.
    var first = baseQueue.next;
    var newState = current.baseState;
    var newBaseState = null;
    var newBaseQueueFirst = null;
    var newBaseQueueLast = null;
    var update = first;

    do {
      // An extra OffscreenLane bit is added to updates that were made to
      // a hidden tree, so that we can distinguish them from updates that were
      // already there when the tree was hidden.
      var updateLane = removeLanes(update.lane, OffscreenLane);
      var isHiddenUpdate = updateLane !== update.lane; // Check if this update was made while the tree was hidden. If so, then
      // it's not a "base" update and we should disregard the extra base lanes
      // that were added to renderLanes when we entered the Offscreen tree.

      var shouldSkipUpdate = isHiddenUpdate ? !isSubsetOfLanes(getWorkInProgressRootRenderLanes(), updateLane) : !isSubsetOfLanes(renderLanes, updateLane);

      if (shouldSkipUpdate) {
        // Priority is insufficient. Skip this update. If this is the first
        // skipped update, the previous update/state is the new base
        // update/state.
        var clone = {
          lane: updateLane,
          action: update.action,
          hasEagerState: update.hasEagerState,
          eagerState: update.eagerState,
          next: null
        };

        if (newBaseQueueLast === null) {
          newBaseQueueFirst = newBaseQueueLast = clone;
          newBaseState = newState;
        } else {
          newBaseQueueLast = newBaseQueueLast.next = clone;
        } // Update the remaining priority in the queue.
        // TODO: Don't need to accumulate this. Instead, we can remove
        // renderLanes from the original lanes.


        currentlyRenderingFiber.lanes = mergeLanes(currentlyRenderingFiber.lanes, updateLane);
        markSkippedUpdateLanes(updateLane);
      } else {
        // This update does have sufficient priority.
        if (newBaseQueueLast !== null) {
          var _clone = {
            // This update is going to be committed so we never want uncommit
            // it. Using NoLane works because 0 is a subset of all bitmasks, so
            // this will never be skipped by the check above.
            lane: NoLane,
            action: update.action,
            hasEagerState: update.hasEagerState,
            eagerState: update.eagerState,
            next: null
          };
          newBaseQueueLast = newBaseQueueLast.next = _clone;
        } // Process this update.


        var action = update.action;

        if (shouldDoubleInvokeUserFnsInHooksDEV) {
          reducer(newState, action);
        }

        if (update.hasEagerState) {
          // If this update is a state update (not a reducer) and was processed eagerly,
          // we can use the eagerly computed state
          newState = update.eagerState;
        } else {
          newState = reducer(newState, action);
        }
      }

      update = update.next;
    } while (update !== null && update !== first);

    if (newBaseQueueLast === null) {
      newBaseState = newState;
    } else {
      newBaseQueueLast.next = newBaseQueueFirst;
    } // Mark that the fiber performed work, but only if the new state is
    // different from the current state.


    if (!objectIs(newState, hook.memoizedState)) {
      markWorkInProgressReceivedUpdate();
    }

    hook.memoizedState = newState;
    hook.baseState = newBaseState;
    hook.baseQueue = newBaseQueueLast;
    queue.lastRenderedState = newState;
  }

  if (baseQueue === null) {
    // `queue.lanes` is used for entangling transitions. We can set it back to
    // zero once the queue is empty.
    queue.lanes = NoLanes;
  }

  var dispatch = queue.dispatch;
  return [hook.memoizedState, dispatch];
}

function rerenderReducer(reducer, initialArg, init) {
  var hook = updateWorkInProgressHook();
  var queue = hook.queue;

  if (queue === null) {
    throw new Error('Should have a queue. This is likely a bug in React. Please file an issue.');
  }

  queue.lastRenderedReducer = reducer; // This is a re-render. Apply the new render phase updates to the previous
  // work-in-progress hook.

  var dispatch = queue.dispatch;
  var lastRenderPhaseUpdate = queue.pending;
  var newState = hook.memoizedState;

  if (lastRenderPhaseUpdate !== null) {
    // The queue doesn't persist past this render pass.
    queue.pending = null;
    var firstRenderPhaseUpdate = lastRenderPhaseUpdate.next;
    var update = firstRenderPhaseUpdate;

    do {
      // Process this render phase update. We don't have to check the
      // priority because it will always be the same as the current
      // render's.
      var action = update.action;
      newState = reducer(newState, action);
      update = update.next;
    } while (update !== firstRenderPhaseUpdate); // Mark that the fiber performed work, but only if the new state is
    // different from the current state.


    if (!objectIs(newState, hook.memoizedState)) {
      markWorkInProgressReceivedUpdate();
    }

    hook.memoizedState = newState; // Don't persist the state accumulated from the render phase updates to
    // the base state unless the queue is empty.
    // TODO: Not sure if this is the desired semantics, but it's what we
    // do for gDSFP. I can't remember why.

    if (hook.baseQueue === null) {
      hook.baseState = newState;
    }

    queue.lastRenderedState = newState;
  }

  return [newState, dispatch];
}

function mountMutableSource(source, getSnapshot, subscribe) {
  {
    return undefined;
  }
}

function updateMutableSource(source, getSnapshot, subscribe) {
  {
    return undefined;
  }
}

function mountSyncExternalStore(subscribe, getSnapshot, getServerSnapshot) {
  var fiber = currentlyRenderingFiber;
  var hook = mountWorkInProgressHook();
  var nextSnapshot;
  var isHydrating = getIsHydrating();

  if (isHydrating) {
    if (getServerSnapshot === undefined) {
      throw new Error('Missing getServerSnapshot, which is required for ' + 'server-rendered content. Will revert to client rendering.');
    }

    nextSnapshot = getServerSnapshot();
  } else {
    nextSnapshot = getSnapshot();
    // Right before committing, we will walk the tree and check if any of the
    // stores were mutated.
    //
    // We won't do this if we're hydrating server-rendered content, because if
    // the content is stale, it's already visible anyway. Instead we'll patch
    // it up in a passive effect.


    var root = getWorkInProgressRoot();

    if (root === null) {
      throw new Error('Expected a work-in-progress root. This is a bug in React. Please file an issue.');
    }

    if (!includesBlockingLane(root, renderLanes)) {
      pushStoreConsistencyCheck(fiber, getSnapshot, nextSnapshot);
    }
  } // Read the current snapshot from the store on every render. This breaks the
  // normal rules of React, and only works because store updates are
  // always synchronous.


  hook.memoizedState = nextSnapshot;
  var inst = {
    value: nextSnapshot,
    getSnapshot: getSnapshot
  };
  hook.queue = inst; // Schedule an effect to subscribe to the store.

  mountEffect(subscribeToStore.bind(null, fiber, inst, subscribe), [subscribe]); // Schedule an effect to update the mutable instance fields. We will update
  // this whenever subscribe, getSnapshot, or value changes. Because there's no
  // clean-up function, and we track the deps correctly, we can call pushEffect
  // directly, without storing any additional state. For the same reason, we
  // don't need to set a static flag, either.
  // TODO: We can move this to the passive phase once we add a pre-commit
  // consistency check. See the next comment.

  fiber.flags |= Passive;
  pushEffect(HasEffect | Passive$1, updateStoreInstance.bind(null, fiber, inst, nextSnapshot, getSnapshot), undefined, null);
  return nextSnapshot;
}

function updateSyncExternalStore(subscribe, getSnapshot, getServerSnapshot) {
  var fiber = currentlyRenderingFiber;
  var hook = updateWorkInProgressHook(); // Read the current snapshot from the store on every render. This breaks the
  // normal rules of React, and only works because store updates are
  // always synchronous.

  var nextSnapshot = getSnapshot();

  var prevSnapshot = (currentHook || hook).memoizedState;
  var snapshotChanged = !objectIs(prevSnapshot, nextSnapshot);

  if (snapshotChanged) {
    hook.memoizedState = nextSnapshot;
    markWorkInProgressReceivedUpdate();
  }

  var inst = hook.queue;
  updateEffect(subscribeToStore.bind(null, fiber, inst, subscribe), [subscribe]); // Whenever getSnapshot or subscribe changes, we need to check in the
  // commit phase if there was an interleaved mutation. In concurrent mode
  // this can happen all the time, but even in synchronous mode, an earlier
  // effect may have mutated the store.

  if (inst.getSnapshot !== getSnapshot || snapshotChanged || // Check if the susbcribe function changed. We can save some memory by
  // checking whether we scheduled a subscription effect above.
  workInProgressHook !== null && workInProgressHook.memoizedState.tag & HasEffect) {
    fiber.flags |= Passive;
    pushEffect(HasEffect | Passive$1, updateStoreInstance.bind(null, fiber, inst, nextSnapshot, getSnapshot), undefined, null); // Unless we're rendering a blocking lane, schedule a consistency check.
    // Right before committing, we will walk the tree and check if any of the
    // stores were mutated.

    var root = getWorkInProgressRoot();

    if (root === null) {
      throw new Error('Expected a work-in-progress root. This is a bug in React. Please file an issue.');
    }

    if (!includesBlockingLane(root, renderLanes)) {
      pushStoreConsistencyCheck(fiber, getSnapshot, nextSnapshot);
    }
  }

  return nextSnapshot;
}

function pushStoreConsistencyCheck(fiber, getSnapshot, renderedSnapshot) {
  fiber.flags |= StoreConsistency;
  var check = {
    getSnapshot: getSnapshot,
    value: renderedSnapshot
  };
  var componentUpdateQueue = currentlyRenderingFiber.updateQueue;

  if (componentUpdateQueue === null) {
    componentUpdateQueue = createFunctionComponentUpdateQueue();
    currentlyRenderingFiber.updateQueue = componentUpdateQueue;
    componentUpdateQueue.stores = [check];
  } else {
    var stores = componentUpdateQueue.stores;

    if (stores === null) {
      componentUpdateQueue.stores = [check];
    } else {
      stores.push(check);
    }
  }
}

function updateStoreInstance(fiber, inst, nextSnapshot, getSnapshot) {
  // These are updated in the passive phase
  inst.value = nextSnapshot;
  inst.getSnapshot = getSnapshot; // Something may have been mutated in between render and commit. This could
  // have been in an event that fired before the passive effects, or it could
  // have been in a layout effect. In that case, we would have used the old
  // snapsho and getSnapshot values to bail out. We need to check one more time.

  if (checkIfSnapshotChanged(inst)) {
    // Force a re-render.
    forceStoreRerender(fiber);
  }
}

function subscribeToStore(fiber, inst, subscribe) {
  var handleStoreChange = function () {
    // The store changed. Check if the snapshot changed since the last time we
    // read from the store.
    if (checkIfSnapshotChanged(inst)) {
      // Force a re-render.
      forceStoreRerender(fiber);
    }
  }; // Subscribe to the store and return a clean-up function.


  return subscribe(handleStoreChange);
}

function checkIfSnapshotChanged(inst) {
  var latestGetSnapshot = inst.getSnapshot;
  var prevValue = inst.value;

  try {
    var nextValue = latestGetSnapshot();
    return !objectIs(prevValue, nextValue);
  } catch (error) {
    return true;
  }
}

function forceStoreRerender(fiber) {
  var root = enqueueConcurrentRenderForLane(fiber, SyncLane);

  if (root !== null) {
    scheduleUpdateOnFiber(root, fiber, SyncLane, NoTimestamp);
  }
}

function mountState(initialState) {
  var hook = mountWorkInProgressHook();

  if (typeof initialState === 'function') {
    // $FlowFixMe: Flow doesn't like mixed types
    initialState = initialState();
  }

  hook.memoizedState = hook.baseState = initialState;
  var queue = {
    pending: null,
    lanes: NoLanes,
    dispatch: null,
    lastRenderedReducer: basicStateReducer,
    lastRenderedState: initialState
  };
  hook.queue = queue;
  var dispatch = queue.dispatch = dispatchSetState.bind(null, currentlyRenderingFiber, queue);
  return [hook.memoizedState, dispatch];
}

function updateState(initialState) {
  return updateReducer(basicStateReducer);
}

function rerenderState(initialState) {
  return rerenderReducer(basicStateReducer);
}

function pushEffect(tag, create, destroy, deps) {
  var effect = {
    tag: tag,
    create: create,
    destroy: destroy,
    deps: deps,
    // Circular
    next: null
  };
  var componentUpdateQueue = currentlyRenderingFiber.updateQueue;

  if (componentUpdateQueue === null) {
    componentUpdateQueue = createFunctionComponentUpdateQueue();
    currentlyRenderingFiber.updateQueue = componentUpdateQueue;
    componentUpdateQueue.lastEffect = effect.next = effect;
  } else {
    var lastEffect = componentUpdateQueue.lastEffect;

    if (lastEffect === null) {
      componentUpdateQueue.lastEffect = effect.next = effect;
    } else {
      var firstEffect = lastEffect.next;
      lastEffect.next = effect;
      effect.next = firstEffect;
      componentUpdateQueue.lastEffect = effect;
    }
  }

  return effect;
}

function mountRef(initialValue) {
  var hook = mountWorkInProgressHook();

  {
    var _ref2 = {
      current: initialValue
    };
    hook.memoizedState = _ref2;
    return _ref2;
  }
}

function updateRef(initialValue) {
  var hook = updateWorkInProgressHook();
  return hook.memoizedState;
}

function mountEffectImpl(fiberFlags, hookFlags, create, deps) {
  var hook = mountWorkInProgressHook();
  var nextDeps = deps === undefined ? null : deps;
  currentlyRenderingFiber.flags |= fiberFlags;
  hook.memoizedState = pushEffect(HasEffect | hookFlags, create, undefined, nextDeps);
}

function updateEffectImpl(fiberFlags, hookFlags, create, deps) {
  var hook = updateWorkInProgressHook();
  var nextDeps = deps === undefined ? null : deps;
  var destroy = undefined;

  if (currentHook !== null) {
    var prevEffect = currentHook.memoizedState;
    destroy = prevEffect.destroy;

    if (nextDeps !== null) {
      var prevDeps = prevEffect.deps;

      if (areHookInputsEqual(nextDeps, prevDeps)) {
        hook.memoizedState = pushEffect(hookFlags, create, destroy, nextDeps);
        return;
      }
    }
  }

  currentlyRenderingFiber.flags |= fiberFlags;
  hook.memoizedState = pushEffect(HasEffect | hookFlags, create, destroy, nextDeps);
}

function mountEffect(create, deps) {
  {
    mountEffectImpl(Passive | PassiveStatic, Passive$1, create, deps);
  }
}

function updateEffect(create, deps) {
  updateEffectImpl(Passive, Passive$1, create, deps);
}

function useEffectEventImpl(payload) {
  currentlyRenderingFiber.flags |= Update;
  var componentUpdateQueue = currentlyRenderingFiber.updateQueue;

  if (componentUpdateQueue === null) {
    componentUpdateQueue = createFunctionComponentUpdateQueue();
    currentlyRenderingFiber.updateQueue = componentUpdateQueue;
    componentUpdateQueue.events = [payload];
  } else {
    var events = componentUpdateQueue.events;

    if (events === null) {
      componentUpdateQueue.events = [payload];
    } else {
      events.push(payload);
    }
  }
}

function mountEvent(callback) {
  var hook = mountWorkInProgressHook();
  var ref = {
    impl: callback
  };
  hook.memoizedState = ref; // $FlowIgnore[incompatible-return]

  return function eventFn() {
    if (isInvalidExecutionContextForEventFunction()) {
      throw new Error("A function wrapped in useEffectEvent can't be called during rendering.");
    }

    return ref.impl.apply(undefined, arguments);
  };
}

function updateEvent(callback) {
  var hook = updateWorkInProgressHook();
  var ref = hook.memoizedState;
  useEffectEventImpl({
    ref: ref,
    nextImpl: callback
  }); // $FlowIgnore[incompatible-return]

  return function eventFn() {
    if (isInvalidExecutionContextForEventFunction()) {
      throw new Error("A function wrapped in useEffectEvent can't be called during rendering.");
    }

    return ref.impl.apply(undefined, arguments);
  };
}

function mountInsertionEffect(create, deps) {
  mountEffectImpl(Update, Insertion, create, deps);
}

function updateInsertionEffect(create, deps) {
  return updateEffectImpl(Update, Insertion, create, deps);
}

function mountLayoutEffect(create, deps) {
  var fiberFlags = Update | LayoutStatic;

  return mountEffectImpl(fiberFlags, Layout, create, deps);
}

function updateLayoutEffect(create, deps) {
  return updateEffectImpl(Update, Layout, create, deps);
}

function imperativeHandleEffect(create, ref) {
  if (typeof ref === 'function') {
    var refCallback = ref;
    var inst = create();
    refCallback(inst);
    return function () {
      refCallback(null);
    };
  } else if (ref !== null && ref !== undefined) {
    var refObject = ref;

    var _inst = create();

    refObject.current = _inst;
    return function () {
      refObject.current = null;
    };
  }
}

function mountImperativeHandle(ref, create, deps) {


  var effectDeps = deps !== null && deps !== undefined ? deps.concat([ref]) : null;
  var fiberFlags = Update | LayoutStatic;

  mountEffectImpl(fiberFlags, Layout, imperativeHandleEffect.bind(null, create, ref), effectDeps);
}

function updateImperativeHandle(ref, create, deps) {


  var effectDeps = deps !== null && deps !== undefined ? deps.concat([ref]) : null;
  updateEffectImpl(Update, Layout, imperativeHandleEffect.bind(null, create, ref), effectDeps);
}

function mountDebugValue(value, formatterFn) {// This hook is normally a no-op.
  // The react-debug-hooks package injects its own implementation
  // so that e.g. DevTools can display custom hook values.
}

var updateDebugValue = mountDebugValue;

function mountCallback(callback, deps) {
  var hook = mountWorkInProgressHook();
  var nextDeps = deps === undefined ? null : deps;
  hook.memoizedState = [callback, nextDeps];
  return callback;
}

function updateCallback(callback, deps) {
  var hook = updateWorkInProgressHook();
  var nextDeps = deps === undefined ? null : deps;
  var prevState = hook.memoizedState;

  if (prevState !== null) {
    if (nextDeps !== null) {
      var prevDeps = prevState[1];

      if (areHookInputsEqual(nextDeps, prevDeps)) {
        return prevState[0];
      }
    }
  }

  hook.memoizedState = [callback, nextDeps];
  return callback;
}

function mountMemo(nextCreate, deps) {
  var hook = mountWorkInProgressHook();
  var nextDeps = deps === undefined ? null : deps;

  if (shouldDoubleInvokeUserFnsInHooksDEV) {
    nextCreate();
  }

  var nextValue = nextCreate();
  hook.memoizedState = [nextValue, nextDeps];
  return nextValue;
}

function updateMemo(nextCreate, deps) {
  var hook = updateWorkInProgressHook();
  var nextDeps = deps === undefined ? null : deps;
  var prevState = hook.memoizedState;

  if (prevState !== null) {
    // Assume these are defined. If they're not, areHookInputsEqual will warn.
    if (nextDeps !== null) {
      var prevDeps = prevState[1];

      if (areHookInputsEqual(nextDeps, prevDeps)) {
        return prevState[0];
      }
    }
  }

  if (shouldDoubleInvokeUserFnsInHooksDEV) {
    nextCreate();
  }

  var nextValue = nextCreate();
  hook.memoizedState = [nextValue, nextDeps];
  return nextValue;
}

function mountDeferredValue(value) {
  var hook = mountWorkInProgressHook();
  hook.memoizedState = value;
  return value;
}

function updateDeferredValue(value) {
  var hook = updateWorkInProgressHook();
  var resolvedCurrentHook = currentHook;
  var prevValue = resolvedCurrentHook.memoizedState;
  return updateDeferredValueImpl(hook, prevValue, value);
}

function rerenderDeferredValue(value) {
  var hook = updateWorkInProgressHook();

  if (currentHook === null) {
    // This is a rerender during a mount.
    hook.memoizedState = value;
    return value;
  } else {
    // This is a rerender during an update.
    var prevValue = currentHook.memoizedState;
    return updateDeferredValueImpl(hook, prevValue, value);
  }
}

function updateDeferredValueImpl(hook, prevValue, value) {
  var shouldDeferValue = !includesOnlyNonUrgentLanes(renderLanes);

  if (shouldDeferValue) {
    // This is an urgent update. If the value has changed, keep using the
    // previous value and spawn a deferred render to update it later.
    if (!objectIs(value, prevValue)) {
      // Schedule a deferred render
      var deferredLane = claimNextTransitionLane();
      currentlyRenderingFiber.lanes = mergeLanes(currentlyRenderingFiber.lanes, deferredLane);
      markSkippedUpdateLanes(deferredLane); // Set this to true to indicate that the rendered value is inconsistent
      // from the latest value. The name "baseState" doesn't really match how we
      // use it because we're reusing a state hook field instead of creating a
      // new one.

      hook.baseState = true;
    } // Reuse the previous value


    return prevValue;
  } else {
    // This is not an urgent update, so we can use the latest value regardless
    // of what it is. No need to defer it.
    // However, if we're currently inside a spawned render, then we need to mark
    // this as an update to prevent the fiber from bailing out.
    //
    // `baseState` is true when the current value is different from the rendered
    // value. The name doesn't really match how we use it because we're reusing
    // a state hook field instead of creating a new one.
    if (hook.baseState) {
      // Flip this back to false.
      hook.baseState = false;
      markWorkInProgressReceivedUpdate();
    }

    hook.memoizedState = value;
    return value;
  }
}

function startTransition(setPending, callback, options) {
  var previousPriority = getCurrentUpdatePriority();
  setCurrentUpdatePriority(higherEventPriority(previousPriority, ContinuousEventPriority));
  setPending(true);
  var prevTransition = ReactCurrentBatchConfig.transition;
  ReactCurrentBatchConfig.transition = {};
  var currentTransition = ReactCurrentBatchConfig.transition;

  try {
    setPending(false);
    callback();
  } finally {
    setCurrentUpdatePriority(previousPriority);
    ReactCurrentBatchConfig.transition = prevTransition;
  }
}

function mountTransition() {
  var _mountState = mountState(false),
      isPending = _mountState[0],
      setPending = _mountState[1]; // The `start` method never changes.


  var start = startTransition.bind(null, setPending);
  var hook = mountWorkInProgressHook();
  hook.memoizedState = start;
  return [isPending, start];
}

function updateTransition() {
  var _updateState = updateState(),
      isPending = _updateState[0];

  var hook = updateWorkInProgressHook();
  var start = hook.memoizedState;
  return [isPending, start];
}

function rerenderTransition() {
  var _rerenderState = rerenderState(),
      isPending = _rerenderState[0];

  var hook = updateWorkInProgressHook();
  var start = hook.memoizedState;
  return [isPending, start];
}

function mountId() {
  var hook = mountWorkInProgressHook();
  var root = getWorkInProgressRoot(); // TODO: In Fizz, id generation is specific to each server config. Maybe we
  // should do this in Fiber, too? Deferring this decision for now because
  // there's no other place to store the prefix except for an internal field on
  // the public createRoot object, which the fiber tree does not currently have
  // a reference to.

  var identifierPrefix = root.identifierPrefix;
  var id;

  if (getIsHydrating()) {
    var treeId = getTreeId(); // Use a captial R prefix for server-generated ids.

    id = ':' + identifierPrefix + 'R' + treeId; // Unless this is the first id at this level, append a number at the end
    // that represents the position of this useId hook among all the useId
    // hooks for this fiber.

    var localId = localIdCounter++;

    if (localId > 0) {
      id += 'H' + localId.toString(32);
    }

    id += ':';
  } else {
    // Use a lowercase r prefix for client-generated ids.
    var globalClientId = globalClientIdCounter++;
    id = ':' + identifierPrefix + 'r' + globalClientId.toString(32) + ':';
  }

  hook.memoizedState = id;
  return id;
}

function updateId() {
  var hook = updateWorkInProgressHook();
  var id = hook.memoizedState;
  return id;
}

function mountRefresh() {
  var hook = mountWorkInProgressHook();
  var refresh = hook.memoizedState = refreshCache.bind(null, currentlyRenderingFiber);
  return refresh;
}

function updateRefresh() {
  var hook = updateWorkInProgressHook();
  return hook.memoizedState;
}

function refreshCache(fiber, seedKey, seedValue) {
  // TODO: Consider warning if the refresh is at discrete priority, or if we
  // otherwise suspect that it wasn't batched properly.


  var provider = fiber.return;

  while (provider !== null) {
    switch (provider.tag) {
      case CacheComponent:
      case HostRoot:
        {
          // Schedule an update on the cache boundary to trigger a refresh.
          var lane = requestUpdateLane(provider);
          var eventTime = requestEventTime();
          var refreshUpdate = createUpdate(eventTime, lane);
          var root = enqueueUpdate$1(provider, refreshUpdate, lane);

          if (root !== null) {
            scheduleUpdateOnFiber(root, provider, lane, eventTime);
            entangleTransitions(root, provider, lane);
          } // TODO: If a refresh never commits, the new cache created here must be
          // released. A simple case is start refreshing a cache boundary, but then
          // unmount that boundary before the refresh completes.


          var seededCache = createCache();

          if (seedKey !== null && seedKey !== undefined && root !== null) {
            {
              // Seed the cache with the value passed by the caller. This could be
              // from a server mutation, or it could be a streaming response.
              seededCache.data.set(seedKey, seedValue);
            }
          }

          var payload = {
            cache: seededCache
          };
          refreshUpdate.payload = payload;
          return;
        }
    }

    provider = provider.return;
  } // TODO: Warn if unmounted?

}

function dispatchReducerAction(fiber, queue, action) {

  var lane = requestUpdateLane(fiber);
  var update = {
    lane: lane,
    action: action,
    hasEagerState: false,
    eagerState: null,
    next: null
  };

  if (isRenderPhaseUpdate(fiber)) {
    enqueueRenderPhaseUpdate(queue, update);
  } else {
    var root = enqueueConcurrentHookUpdate(fiber, queue, update, lane);

    if (root !== null) {
      var eventTime = requestEventTime();
      scheduleUpdateOnFiber(root, fiber, lane, eventTime);
      entangleTransitionUpdate(root, queue, lane);
    }
  }

  markUpdateInDevTools(fiber, lane);
}

function dispatchSetState(fiber, queue, action) {

  var lane = requestUpdateLane(fiber);
  var update = {
    lane: lane,
    action: action,
    hasEagerState: false,
    eagerState: null,
    next: null
  };

  if (isRenderPhaseUpdate(fiber)) {
    enqueueRenderPhaseUpdate(queue, update);
  } else {
    var alternate = fiber.alternate;

    if (fiber.lanes === NoLanes && (alternate === null || alternate.lanes === NoLanes)) {
      // The queue is currently empty, which means we can eagerly compute the
      // next state before entering the render phase. If the new state is the
      // same as the current state, we may be able to bail out entirely.
      var lastRenderedReducer = queue.lastRenderedReducer;

      if (lastRenderedReducer !== null) {

        try {
          var currentState = queue.lastRenderedState;
          var eagerState = lastRenderedReducer(currentState, action); // Stash the eagerly computed state, and the reducer used to compute
          // it, on the update object. If the reducer hasn't changed by the
          // time we enter the render phase, then the eager state can be used
          // without calling the reducer again.

          update.hasEagerState = true;
          update.eagerState = eagerState;

          if (objectIs(eagerState, currentState)) {
            // Fast path. We can bail out without scheduling React to re-render.
            // It's still possible that we'll need to rebase this update later,
            // if the component re-renders for a different reason and by that
            // time the reducer has changed.
            // TODO: Do we still need to entangle transitions in this case?
            enqueueConcurrentHookUpdateAndEagerlyBailout(fiber, queue, update);
            return;
          }
        } catch (error) {// Suppress the error. It will throw again in the render phase.
        } finally {
        }
      }
    }

    var root = enqueueConcurrentHookUpdate(fiber, queue, update, lane);

    if (root !== null) {
      var eventTime = requestEventTime();
      scheduleUpdateOnFiber(root, fiber, lane, eventTime);
      entangleTransitionUpdate(root, queue, lane);
    }
  }

  markUpdateInDevTools(fiber, lane);
}

function isRenderPhaseUpdate(fiber) {
  var alternate = fiber.alternate;
  return fiber === currentlyRenderingFiber || alternate !== null && alternate === currentlyRenderingFiber;
}

function enqueueRenderPhaseUpdate(queue, update) {
  // This is a render phase update. Stash it in a lazily-created map of
  // queue -> linked list of updates. After this render pass, we'll restart
  // and apply the stashed updates on top of the work-in-progress hook.
  didScheduleRenderPhaseUpdateDuringThisPass = didScheduleRenderPhaseUpdate = true;
  var pending = queue.pending;

  if (pending === null) {
    // This is the first update. Create a circular list.
    update.next = update;
  } else {
    update.next = pending.next;
    pending.next = update;
  }

  queue.pending = update;
} // TODO: Move to ReactFiberConcurrentUpdates?


function entangleTransitionUpdate(root, queue, lane) {
  if (isTransitionLane(lane)) {
    var queueLanes = queue.lanes; // If any entangled lanes are no longer pending on the root, then they
    // must have finished. We can remove them from the shared queue, which
    // represents a superset of the actually pending lanes. In some cases we
    // may entangle more than we need to, but that's OK. In fact it's worse if
    // we *don't* entangle when we should.

    queueLanes = intersectLanes(queueLanes, root.pendingLanes); // Entangle the new transition lane with the other transition lanes.

    var newQueueLanes = mergeLanes(queueLanes, lane);
    queue.lanes = newQueueLanes; // Even if queue.lanes already include lane, we don't know for certain if
    // the lane finished since the last time we entangled it. So we need to
    // entangle it again, just to be sure.

    markRootEntangled(root, newQueueLanes);
  }
}

function markUpdateInDevTools(fiber, lane, action) {

  {
    markStateUpdateScheduled(fiber, lane);
  }
}

var ContextOnlyDispatcher = {
  readContext: readContext,
  useCallback: throwInvalidHookError,
  useContext: throwInvalidHookError,
  useEffect: throwInvalidHookError,
  useImperativeHandle: throwInvalidHookError,
  useInsertionEffect: throwInvalidHookError,
  useLayoutEffect: throwInvalidHookError,
  useMemo: throwInvalidHookError,
  useReducer: throwInvalidHookError,
  useRef: throwInvalidHookError,
  useState: throwInvalidHookError,
  useDebugValue: throwInvalidHookError,
  useDeferredValue: throwInvalidHookError,
  useTransition: throwInvalidHookError,
  useMutableSource: throwInvalidHookError,
  useSyncExternalStore: throwInvalidHookError,
  useId: throwInvalidHookError
};

{
  ContextOnlyDispatcher.useCacheRefresh = throwInvalidHookError;
}

{
  ContextOnlyDispatcher.use = throwInvalidHookError;
}

{
  ContextOnlyDispatcher.useMemoCache = throwInvalidHookError;
}

{
  ContextOnlyDispatcher.useEffectEvent = throwInvalidHookError;
}

var HooksDispatcherOnMount = {
  readContext: readContext,
  useCallback: mountCallback,
  useContext: readContext,
  useEffect: mountEffect,
  useImperativeHandle: mountImperativeHandle,
  useLayoutEffect: mountLayoutEffect,
  useInsertionEffect: mountInsertionEffect,
  useMemo: mountMemo,
  useReducer: mountReducer,
  useRef: mountRef,
  useState: mountState,
  useDebugValue: mountDebugValue,
  useDeferredValue: mountDeferredValue,
  useTransition: mountTransition,
  useMutableSource: mountMutableSource,
  useSyncExternalStore: mountSyncExternalStore,
  useId: mountId
};

{
  // $FlowFixMe[escaped-generic] discovered when updating Flow
  HooksDispatcherOnMount.useCacheRefresh = mountRefresh;
}

{
  HooksDispatcherOnMount.use = use;
}

{
  HooksDispatcherOnMount.useMemoCache = useMemoCache;
}

{
  HooksDispatcherOnMount.useEffectEvent = mountEvent;
}

var HooksDispatcherOnUpdate = {
  readContext: readContext,
  useCallback: updateCallback,
  useContext: readContext,
  useEffect: updateEffect,
  useImperativeHandle: updateImperativeHandle,
  useInsertionEffect: updateInsertionEffect,
  useLayoutEffect: updateLayoutEffect,
  useMemo: updateMemo,
  useReducer: updateReducer,
  useRef: updateRef,
  useState: updateState,
  useDebugValue: updateDebugValue,
  useDeferredValue: updateDeferredValue,
  useTransition: updateTransition,
  useMutableSource: updateMutableSource,
  useSyncExternalStore: updateSyncExternalStore,
  useId: updateId
};

{
  HooksDispatcherOnUpdate.useCacheRefresh = updateRefresh;
}

{
  HooksDispatcherOnUpdate.useMemoCache = useMemoCache;
}

{
  HooksDispatcherOnUpdate.use = use;
}

{
  HooksDispatcherOnUpdate.useEffectEvent = updateEvent;
}

var HooksDispatcherOnRerender = {
  readContext: readContext,
  useCallback: updateCallback,
  useContext: readContext,
  useEffect: updateEffect,
  useImperativeHandle: updateImperativeHandle,
  useInsertionEffect: updateInsertionEffect,
  useLayoutEffect: updateLayoutEffect,
  useMemo: updateMemo,
  useReducer: rerenderReducer,
  useRef: updateRef,
  useState: rerenderState,
  useDebugValue: updateDebugValue,
  useDeferredValue: rerenderDeferredValue,
  useTransition: rerenderTransition,
  useMutableSource: updateMutableSource,
  useSyncExternalStore: updateSyncExternalStore,
  useId: updateId
};

{
  HooksDispatcherOnRerender.useCacheRefresh = updateRefresh;
}

{
  HooksDispatcherOnRerender.use = use;
}

{
  HooksDispatcherOnRerender.useMemoCache = useMemoCache;
}

{
  HooksDispatcherOnRerender.useEffectEvent = updateEvent;
}

var now$1 = Scheduler.unstable_now;
var commitTime = 0;
var layoutEffectStartTime = -1;
var profilerStartTime = -1;
var passiveEffectStartTime = -1;
/**
 * Tracks whether the current update was a nested/cascading update (scheduled from a layout effect).
 *
 * The overall sequence is:
 *   1. render
 *   2. commit (and call `onRender`, `onCommit`)
 *   3. check for nested updates
 *   4. flush passive effects (and call `onPostCommit`)
 *
 * Nested updates are identified in step 3 above,
 * but step 4 still applies to the work that was just committed.
 * We use two flags to track nested updates then:
 * one tracks whether the upcoming update is a nested update,
 * and the other tracks whether the current update was a nested update.
 * The first value gets synced to the second at the start of the render phase.
 */

var currentUpdateIsNested = false;
var nestedUpdateScheduled = false;

function isCurrentUpdateNested() {
  return currentUpdateIsNested;
}

function markNestedUpdateScheduled() {
  {
    nestedUpdateScheduled = true;
  }
}

function resetNestedUpdateFlag() {
  {
    currentUpdateIsNested = false;
    nestedUpdateScheduled = false;
  }
}

function syncNestedUpdateFlag() {
  {
    currentUpdateIsNested = nestedUpdateScheduled;
    nestedUpdateScheduled = false;
  }
}

function getCommitTime() {
  return commitTime;
}

function recordCommitTime() {

  commitTime = now$1();
}

function startProfilerTimer(fiber) {

  profilerStartTime = now$1();

  if (fiber.actualStartTime < 0) {
    fiber.actualStartTime = now$1();
  }
}

function stopProfilerTimerIfRunning(fiber) {

  profilerStartTime = -1;
}

function stopProfilerTimerIfRunningAndRecordDelta(fiber, overrideBaseTime) {

  if (profilerStartTime >= 0) {
    var elapsedTime = now$1() - profilerStartTime; // $FlowFixMe[unsafe-addition] addition with possible null/undefined value

    fiber.actualDuration += elapsedTime;

    if (overrideBaseTime) {
      fiber.selfBaseDuration = elapsedTime;
    }

    profilerStartTime = -1;
  }
}

function recordLayoutEffectDuration(fiber) {

  if (layoutEffectStartTime >= 0) {
    var elapsedTime = now$1() - layoutEffectStartTime;
    layoutEffectStartTime = -1; // Store duration on the next nearest Profiler ancestor
    // Or the root (for the DevTools Profiler to read)

    var parentFiber = fiber.return;

    while (parentFiber !== null) {
      switch (parentFiber.tag) {
        case HostRoot:
          var root = parentFiber.stateNode;
          root.effectDuration += elapsedTime;
          return;

        case Profiler:
          var parentStateNode = parentFiber.stateNode;
          parentStateNode.effectDuration += elapsedTime;
          return;
      }

      parentFiber = parentFiber.return;
    }
  }
}

function recordPassiveEffectDuration(fiber) {

  if (passiveEffectStartTime >= 0) {
    var elapsedTime = now$1() - passiveEffectStartTime;
    passiveEffectStartTime = -1; // Store duration on the next nearest Profiler ancestor
    // Or the root (for the DevTools Profiler to read)

    var parentFiber = fiber.return;

    while (parentFiber !== null) {
      switch (parentFiber.tag) {
        case HostRoot:
          var root = parentFiber.stateNode;

          if (root !== null) {
            root.passiveEffectDuration += elapsedTime;
          }

          return;

        case Profiler:
          var parentStateNode = parentFiber.stateNode;

          if (parentStateNode !== null) {
            // Detached fibers have their state node cleared out.
            // In this case, the return pointer is also cleared out,
            // so we won't be able to report the time spent in this Profiler's subtree.
            parentStateNode.passiveEffectDuration += elapsedTime;
          }

          return;
      }

      parentFiber = parentFiber.return;
    }
  }
}

function startLayoutEffectTimer() {

  layoutEffectStartTime = now$1();
}

function startPassiveEffectTimer() {

  passiveEffectStartTime = now$1();
}

function transferActualDuration(fiber) {
  // Transfer time spent rendering these children so we don't lose it
  // after we rerender. This is used as a helper in special cases
  // where we should count the work of multiple passes.
  var child = fiber.child;

  while (child) {
    // $FlowFixMe[unsafe-addition] addition with possible null/undefined value
    fiber.actualDuration += child.actualDuration;
    child = child.sibling;
  }
}

function resolveDefaultProps(Component, baseProps) {
  if (Component && Component.defaultProps) {
    // Resolve default props. Taken from ReactElement
    var props = assign({}, baseProps);
    var defaultProps = Component.defaultProps;

    for (var propName in defaultProps) {
      if (props[propName] === undefined) {
        props[propName] = defaultProps[propName];
      }
    }

    return props;
  }

  return baseProps;
}

function applyDerivedStateFromProps(workInProgress, ctor, getDerivedStateFromProps, nextProps) {
  var prevState = workInProgress.memoizedState;
  var partialState = getDerivedStateFromProps(nextProps, prevState);


  var memoizedState = partialState === null || partialState === undefined ? prevState : assign({}, prevState, partialState);
  workInProgress.memoizedState = memoizedState; // Once the update queue is empty, persist the derived state onto the
  // base state.

  if (workInProgress.lanes === NoLanes) {
    // Queue is always non-null for classes
    var updateQueue = workInProgress.updateQueue;
    updateQueue.baseState = memoizedState;
  }
}

var classComponentUpdater = {
  isMounted: isMounted,
  enqueueSetState: function (inst, payload, callback) {
    var fiber = get(inst);
    var eventTime = requestEventTime();
    var lane = requestUpdateLane(fiber);
    var update = createUpdate(eventTime, lane);
    update.payload = payload;

    if (callback !== undefined && callback !== null) {

      update.callback = callback;
    }

    var root = enqueueUpdate$1(fiber, update, lane);

    if (root !== null) {
      scheduleUpdateOnFiber(root, fiber, lane, eventTime);
      entangleTransitions(root, fiber, lane);
    }

    {
      markStateUpdateScheduled(fiber, lane);
    }
  },
  enqueueReplaceState: function (inst, payload, callback) {
    var fiber = get(inst);
    var eventTime = requestEventTime();
    var lane = requestUpdateLane(fiber);
    var update = createUpdate(eventTime, lane);
    update.tag = ReplaceState;
    update.payload = payload;

    if (callback !== undefined && callback !== null) {

      update.callback = callback;
    }

    var root = enqueueUpdate$1(fiber, update, lane);

    if (root !== null) {
      scheduleUpdateOnFiber(root, fiber, lane, eventTime);
      entangleTransitions(root, fiber, lane);
    }

    {
      markStateUpdateScheduled(fiber, lane);
    }
  },
  enqueueForceUpdate: function (inst, callback) {
    var fiber = get(inst);
    var eventTime = requestEventTime();
    var lane = requestUpdateLane(fiber);
    var update = createUpdate(eventTime, lane);
    update.tag = ForceUpdate;

    if (callback !== undefined && callback !== null) {

      update.callback = callback;
    }

    var root = enqueueUpdate$1(fiber, update, lane);

    if (root !== null) {
      scheduleUpdateOnFiber(root, fiber, lane, eventTime);
      entangleTransitions(root, fiber, lane);
    }

    {
      markForceUpdateScheduled(fiber, lane);
    }
  }
};

function checkShouldComponentUpdate(workInProgress, ctor, oldProps, newProps, oldState, newState, nextContext) {
  var instance = workInProgress.stateNode;

  if (typeof instance.shouldComponentUpdate === 'function') {
    var shouldUpdate = instance.shouldComponentUpdate(newProps, newState, nextContext);

    return shouldUpdate;
  }

  if (ctor.prototype && ctor.prototype.isPureReactComponent) {
    return !shallowEqual(oldProps, newProps) || !shallowEqual(oldState, newState);
  }

  return true;
}

function adoptClassInstance(workInProgress, instance) {
  instance.updater = classComponentUpdater;
  workInProgress.stateNode = instance; // The instance needs access to the fiber so that it can schedule updates

  set(instance, workInProgress);
}

function constructClassInstance(workInProgress, ctor, props) {
  var isLegacyContextConsumer = false;
  var unmaskedContext = emptyContextObject;
  var context = emptyContextObject;
  var contextType = ctor.contextType;

  if (typeof contextType === 'object' && contextType !== null) {
    context = readContext(contextType);
  } else {
    unmaskedContext = getUnmaskedContext(workInProgress, ctor, true);
    var contextTypes = ctor.contextTypes;
    isLegacyContextConsumer = contextTypes !== null && contextTypes !== undefined;
    context = isLegacyContextConsumer ? getMaskedContext(workInProgress, unmaskedContext) : emptyContextObject;
  }

  var instance = new ctor(props, context); // Instantiate twice to help detect side-effects.

  var state = workInProgress.memoizedState = instance.state !== null && instance.state !== undefined ? instance.state : null;
  adoptClassInstance(workInProgress, instance);
  // ReactFiberContext usually updates this cache but can't for newly-created instances.


  if (isLegacyContextConsumer) {
    cacheContext(workInProgress, unmaskedContext, context);
  }

  return instance;
}

function callComponentWillMount(workInProgress, instance) {
  var oldState = instance.state;

  if (typeof instance.componentWillMount === 'function') {
    instance.componentWillMount();
  }

  if (typeof instance.UNSAFE_componentWillMount === 'function') {
    instance.UNSAFE_componentWillMount();
  }

  if (oldState !== instance.state) {

    classComponentUpdater.enqueueReplaceState(instance, instance.state, null);
  }
}

function callComponentWillReceiveProps(workInProgress, instance, newProps, nextContext) {
  var oldState = instance.state;

  if (typeof instance.componentWillReceiveProps === 'function') {
    instance.componentWillReceiveProps(newProps, nextContext);
  }

  if (typeof instance.UNSAFE_componentWillReceiveProps === 'function') {
    instance.UNSAFE_componentWillReceiveProps(newProps, nextContext);
  }

  if (instance.state !== oldState) {

    classComponentUpdater.enqueueReplaceState(instance, instance.state, null);
  }
} // Invokes the mount life-cycles on a previously never rendered instance.


function mountClassInstance(workInProgress, ctor, newProps, renderLanes) {

  var instance = workInProgress.stateNode;
  instance.props = newProps;
  instance.state = workInProgress.memoizedState;
  instance.refs = {};
  initializeUpdateQueue(workInProgress);
  var contextType = ctor.contextType;

  if (typeof contextType === 'object' && contextType !== null) {
    instance.context = readContext(contextType);
  } else {
    var unmaskedContext = getUnmaskedContext(workInProgress, ctor, true);
    instance.context = getMaskedContext(workInProgress, unmaskedContext);
  }

  instance.state = workInProgress.memoizedState;
  var getDerivedStateFromProps = ctor.getDerivedStateFromProps;

  if (typeof getDerivedStateFromProps === 'function') {
    applyDerivedStateFromProps(workInProgress, ctor, getDerivedStateFromProps, newProps);
    instance.state = workInProgress.memoizedState;
  } // In order to support react-lifecycles-compat polyfilled components,
  // Unsafe lifecycles should not be invoked for components using the new APIs.


  if (typeof ctor.getDerivedStateFromProps !== 'function' && typeof instance.getSnapshotBeforeUpdate !== 'function' && (typeof instance.UNSAFE_componentWillMount === 'function' || typeof instance.componentWillMount === 'function')) {
    callComponentWillMount(workInProgress, instance); // If we had additional state updates during this life-cycle, let's
    // process them now.

    processUpdateQueue(workInProgress, newProps, instance, renderLanes);
    instance.state = workInProgress.memoizedState;
  }

  if (typeof instance.componentDidMount === 'function') {
    var fiberFlags = Update | LayoutStatic;

    workInProgress.flags |= fiberFlags;
  }
}

function resumeMountClassInstance(workInProgress, ctor, newProps, renderLanes) {
  var instance = workInProgress.stateNode;
  var oldProps = workInProgress.memoizedProps;
  instance.props = oldProps;
  var oldContext = instance.context;
  var contextType = ctor.contextType;
  var nextContext = emptyContextObject;

  if (typeof contextType === 'object' && contextType !== null) {
    nextContext = readContext(contextType);
  } else {
    var nextLegacyUnmaskedContext = getUnmaskedContext(workInProgress, ctor, true);
    nextContext = getMaskedContext(workInProgress, nextLegacyUnmaskedContext);
  }

  var getDerivedStateFromProps = ctor.getDerivedStateFromProps;
  var hasNewLifecycles = typeof getDerivedStateFromProps === 'function' || typeof instance.getSnapshotBeforeUpdate === 'function'; // Note: During these life-cycles, instance.props/instance.state are what
  // ever the previously attempted to render - not the "current". However,
  // during componentDidUpdate we pass the "current" props.
  // In order to support react-lifecycles-compat polyfilled components,
  // Unsafe lifecycles should not be invoked for components using the new APIs.

  if (!hasNewLifecycles && (typeof instance.UNSAFE_componentWillReceiveProps === 'function' || typeof instance.componentWillReceiveProps === 'function')) {
    if (oldProps !== newProps || oldContext !== nextContext) {
      callComponentWillReceiveProps(workInProgress, instance, newProps, nextContext);
    }
  }

  resetHasForceUpdateBeforeProcessing();
  var oldState = workInProgress.memoizedState;
  var newState = instance.state = oldState;
  processUpdateQueue(workInProgress, newProps, instance, renderLanes);
  newState = workInProgress.memoizedState;

  if (oldProps === newProps && oldState === newState && !hasContextChanged() && !checkHasForceUpdateAfterProcessing()) {
    // If an update was already in progress, we should schedule an Update
    // effect even though we're bailing out, so that cWU/cDU are called.
    if (typeof instance.componentDidMount === 'function') {
      var fiberFlags = Update | LayoutStatic;

      workInProgress.flags |= fiberFlags;
    }

    return false;
  }

  if (typeof getDerivedStateFromProps === 'function') {
    applyDerivedStateFromProps(workInProgress, ctor, getDerivedStateFromProps, newProps);
    newState = workInProgress.memoizedState;
  }

  var shouldUpdate = checkHasForceUpdateAfterProcessing() || checkShouldComponentUpdate(workInProgress, ctor, oldProps, newProps, oldState, newState, nextContext);

  if (shouldUpdate) {
    // In order to support react-lifecycles-compat polyfilled components,
    // Unsafe lifecycles should not be invoked for components using the new APIs.
    if (!hasNewLifecycles && (typeof instance.UNSAFE_componentWillMount === 'function' || typeof instance.componentWillMount === 'function')) {
      if (typeof instance.componentWillMount === 'function') {
        instance.componentWillMount();
      }

      if (typeof instance.UNSAFE_componentWillMount === 'function') {
        instance.UNSAFE_componentWillMount();
      }
    }

    if (typeof instance.componentDidMount === 'function') {
      var _fiberFlags = Update | LayoutStatic;

      workInProgress.flags |= _fiberFlags;
    }
  } else {
    // If an update was already in progress, we should schedule an Update
    // effect even though we're bailing out, so that cWU/cDU are called.
    if (typeof instance.componentDidMount === 'function') {
      var _fiberFlags2 = Update | LayoutStatic;

      workInProgress.flags |= _fiberFlags2;
    } // If shouldComponentUpdate returned false, we should still update the
    // memoized state to indicate that this work can be reused.


    workInProgress.memoizedProps = newProps;
    workInProgress.memoizedState = newState;
  } // Update the existing instance's state, props, and context pointers even
  // if shouldComponentUpdate returns false.


  instance.props = newProps;
  instance.state = newState;
  instance.context = nextContext;
  return shouldUpdate;
} // Invokes the update life-cycles and returns false if it shouldn't rerender.


function updateClassInstance(current, workInProgress, ctor, newProps, renderLanes) {
  var instance = workInProgress.stateNode;
  cloneUpdateQueue(current, workInProgress);
  var unresolvedOldProps = workInProgress.memoizedProps;
  var oldProps = workInProgress.type === workInProgress.elementType ? unresolvedOldProps : resolveDefaultProps(workInProgress.type, unresolvedOldProps);
  instance.props = oldProps;
  var unresolvedNewProps = workInProgress.pendingProps;
  var oldContext = instance.context;
  var contextType = ctor.contextType;
  var nextContext = emptyContextObject;

  if (typeof contextType === 'object' && contextType !== null) {
    nextContext = readContext(contextType);
  } else {
    var nextUnmaskedContext = getUnmaskedContext(workInProgress, ctor, true);
    nextContext = getMaskedContext(workInProgress, nextUnmaskedContext);
  }

  var getDerivedStateFromProps = ctor.getDerivedStateFromProps;
  var hasNewLifecycles = typeof getDerivedStateFromProps === 'function' || typeof instance.getSnapshotBeforeUpdate === 'function'; // Note: During these life-cycles, instance.props/instance.state are what
  // ever the previously attempted to render - not the "current". However,
  // during componentDidUpdate we pass the "current" props.
  // In order to support react-lifecycles-compat polyfilled components,
  // Unsafe lifecycles should not be invoked for components using the new APIs.

  if (!hasNewLifecycles && (typeof instance.UNSAFE_componentWillReceiveProps === 'function' || typeof instance.componentWillReceiveProps === 'function')) {
    if (unresolvedOldProps !== unresolvedNewProps || oldContext !== nextContext) {
      callComponentWillReceiveProps(workInProgress, instance, newProps, nextContext);
    }
  }

  resetHasForceUpdateBeforeProcessing();
  var oldState = workInProgress.memoizedState;
  var newState = instance.state = oldState;
  processUpdateQueue(workInProgress, newProps, instance, renderLanes);
  newState = workInProgress.memoizedState;

  if (unresolvedOldProps === unresolvedNewProps && oldState === newState && !hasContextChanged() && !checkHasForceUpdateAfterProcessing() && !(enableLazyContextPropagation   )) {
    // If an update was already in progress, we should schedule an Update
    // effect even though we're bailing out, so that cWU/cDU are called.
    if (typeof instance.componentDidUpdate === 'function') {
      if (unresolvedOldProps !== current.memoizedProps || oldState !== current.memoizedState) {
        workInProgress.flags |= Update;
      }
    }

    if (typeof instance.getSnapshotBeforeUpdate === 'function') {
      if (unresolvedOldProps !== current.memoizedProps || oldState !== current.memoizedState) {
        workInProgress.flags |= Snapshot;
      }
    }

    return false;
  }

  if (typeof getDerivedStateFromProps === 'function') {
    applyDerivedStateFromProps(workInProgress, ctor, getDerivedStateFromProps, newProps);
    newState = workInProgress.memoizedState;
  }

  var shouldUpdate = checkHasForceUpdateAfterProcessing() || checkShouldComponentUpdate(workInProgress, ctor, oldProps, newProps, oldState, newState, nextContext) || // TODO: In some cases, we'll end up checking if context has changed twice,
  // both before and after `shouldComponentUpdate` has been called. Not ideal,
  // but I'm loath to refactor this function. This only happens for memoized
  // components so it's not that common.
  enableLazyContextPropagation   ;

  if (shouldUpdate) {
    // In order to support react-lifecycles-compat polyfilled components,
    // Unsafe lifecycles should not be invoked for components using the new APIs.
    if (!hasNewLifecycles && (typeof instance.UNSAFE_componentWillUpdate === 'function' || typeof instance.componentWillUpdate === 'function')) {
      if (typeof instance.componentWillUpdate === 'function') {
        instance.componentWillUpdate(newProps, newState, nextContext);
      }

      if (typeof instance.UNSAFE_componentWillUpdate === 'function') {
        instance.UNSAFE_componentWillUpdate(newProps, newState, nextContext);
      }
    }

    if (typeof instance.componentDidUpdate === 'function') {
      workInProgress.flags |= Update;
    }

    if (typeof instance.getSnapshotBeforeUpdate === 'function') {
      workInProgress.flags |= Snapshot;
    }
  } else {
    // If an update was already in progress, we should schedule an Update
    // effect even though we're bailing out, so that cWU/cDU are called.
    if (typeof instance.componentDidUpdate === 'function') {
      if (unresolvedOldProps !== current.memoizedProps || oldState !== current.memoizedState) {
        workInProgress.flags |= Update;
      }
    }

    if (typeof instance.getSnapshotBeforeUpdate === 'function') {
      if (unresolvedOldProps !== current.memoizedProps || oldState !== current.memoizedState) {
        workInProgress.flags |= Snapshot;
      }
    } // If shouldComponentUpdate returned false, we should still update the
    // memoized props/state to indicate that this work can be reused.


    workInProgress.memoizedProps = newProps;
    workInProgress.memoizedState = newState;
  } // Update the existing instance's state, props, and context pointers even
  // if shouldComponentUpdate returns false.


  instance.props = newProps;
  instance.state = newState;
  instance.context = nextContext;
  return shouldUpdate;
}

function createCapturedValueAtFiber(value, source) {
  // If the value is an error, call this function immediately after it is thrown
  // so the stack is accurate.
  return {
    value: value,
    source: source,
    stack: getStackByFiberInDevAndProd(source),
    digest: null
  };
}
function createCapturedValue(value, digest, stack) {
  return {
    value: value,
    source: null,
    stack: stack != null ? stack : null,
    digest: digest != null ? digest : null
  };
}

// This module is forked in different environments.
// By default, return `true` to log errors to the console.
// Forks can return `false` if this isn't desirable.
function showErrorDialog(boundary, errorInfo) {
  return true;
}

function logCapturedError(boundary, errorInfo) {
  try {
    var logError = showErrorDialog(boundary, errorInfo); // Allow injected showErrorDialog() to prevent default console.error logging.
    // This enables renderers like ReactNative to better manage redbox behavior.

    if (logError === false) {
      return;
    }

    var error = errorInfo.value;

    if (false) {
      var source = errorInfo.source;
      var stack = errorInfo.stack;
      var componentStack = stack !== null ? stack : ''; // Browsers support silencing uncaught errors by calling
      // `preventDefault()` in window `error` handler.
      // We record this information as an expando on the error.

      if (error != null && error._suppressLogging) {
        if (boundary.tag === ClassComponent) {
          // The error is recoverable and was silenced.
          // Ignore it and don't print the stack addendum.
          // This is handy for testing error boundaries without noise.
          return;
        } // The error is fatal. Since the silencing might have
        // been accidental, we'll surface it anyway.
        // However, the browser would have silenced the original error
        // so we'll print it first, and then print the stack addendum.


        console['error'](error); // Don't transform to our wrapper
        // For a more detailed description of this block, see:
        // https://github.com/facebook/react/pull/13384
      }

      var componentName = source ? getComponentNameFromFiber(source) : null;
      var componentNameMessage = componentName ? "The above error occurred in the <" + componentName + "> component:" : 'The above error occurred in one of your React components:';
      var errorBoundaryMessage;

      if (boundary.tag === HostRoot) {
        errorBoundaryMessage = 'Consider adding an error boundary to your tree to customize error handling behavior.\n' + 'Visit https://reactjs.org/link/error-boundaries to learn more about error boundaries.';
      } else {
        var errorBoundaryName = getComponentNameFromFiber(boundary) || 'Anonymous';
        errorBoundaryMessage = "React will try to recreate this component tree from scratch " + ("using the error boundary you provided, " + errorBoundaryName + ".");
      }

      var combinedMessage = componentNameMessage + "\n" + componentStack + "\n\n" + ("" + errorBoundaryMessage); // In development, we provide our own message with just the component stack.
      // We don't include the original error message and JS stack because the browser
      // has already printed it. Even if the application swallows the error, it is still
      // displayed by the browser thanks to the DEV-only fake event trick in ReactErrorUtils.

      console['error'](combinedMessage); // Don't transform to our wrapper
    } else {
      // In production, we print the error directly.
      // This will include the message, the JS stack, and anything the browser wants to show.
      // We pass the error object instead of custom message so that the browser displays the error natively.
      console['error'](error); // Don't transform to our wrapper
    }
  } catch (e) {
    // This method must not throw, or React internal state will get messed up.
    // If console.error is overridden, or logCapturedError() shows a dialog that throws,
    // we want to report this error outside of the normal stack as a last resort.
    // https://github.com/facebook/react/issues/13188
    setTimeout(function () {
      throw e;
    });
  }
}

function createRootErrorUpdate(fiber, errorInfo, lane) {
  var update = createUpdate(NoTimestamp, lane); // Unmount the root by rendering null.

  update.tag = CaptureUpdate; // Caution: React DevTools currently depends on this property
  // being called "element".

  update.payload = {
    element: null
  };
  var error = errorInfo.value;

  update.callback = function () {
    onUncaughtError(error);
    logCapturedError(fiber, errorInfo);
  };

  return update;
}

function createClassErrorUpdate(fiber, errorInfo, lane) {
  var update = createUpdate(NoTimestamp, lane);
  update.tag = CaptureUpdate;
  var getDerivedStateFromError = fiber.type.getDerivedStateFromError;

  if (typeof getDerivedStateFromError === 'function') {
    var error = errorInfo.value;

    update.payload = function () {
      return getDerivedStateFromError(error);
    };

    update.callback = function () {

      logCapturedError(fiber, errorInfo);
    };
  }

  var inst = fiber.stateNode;

  if (inst !== null && typeof inst.componentDidCatch === 'function') {
    update.callback = function callback() {

      logCapturedError(fiber, errorInfo);

      if (typeof getDerivedStateFromError !== 'function') {
        // To preserve the preexisting retry behavior of error boundaries,
        // we keep track of which ones already failed during this batch.
        // This gets reset before we yield back to the browser.
        // TODO: Warn in strict mode if getDerivedStateFromError is
        // not defined.
        markLegacyErrorBoundaryAsFailed(this);
      }

      var error = errorInfo.value;
      var stack = errorInfo.stack;
      this.componentDidCatch(error, {
        componentStack: stack !== null ? stack : ''
      });
    };
  }

  return update;
}

function resetSuspendedComponent(sourceFiber, rootRenderLanes) {
  // A legacy mode Suspense quirk, only relevant to hook components.


  var tag = sourceFiber.tag;

  if ((sourceFiber.mode & ConcurrentMode) === NoMode && (tag === FunctionComponent || tag === ForwardRef || tag === SimpleMemoComponent)) {
    var currentSource = sourceFiber.alternate;

    if (currentSource) {
      sourceFiber.updateQueue = currentSource.updateQueue;
      sourceFiber.memoizedState = currentSource.memoizedState;
      sourceFiber.lanes = currentSource.lanes;
    } else {
      sourceFiber.updateQueue = null;
      sourceFiber.memoizedState = null;
    }
  }
}

function markSuspenseBoundaryShouldCapture(suspenseBoundary, returnFiber, sourceFiber, root, rootRenderLanes) {
  // This marks a Suspense boundary so that when we're unwinding the stack,
  // it captures the suspended "exception" and does a second (fallback) pass.
  if ((suspenseBoundary.mode & ConcurrentMode) === NoMode) {
    // Legacy Mode Suspense
    //
    // If the boundary is in legacy mode, we should *not*
    // suspend the commit. Pretend as if the suspended component rendered
    // null and keep rendering. When the Suspense boundary completes,
    // we'll do a second pass to render the fallback.
    if (suspenseBoundary === returnFiber) {
      // Special case where we suspended while reconciling the children of
      // a Suspense boundary's inner Offscreen wrapper fiber. This happens
      // when a React.lazy component is a direct child of a
      // Suspense boundary.
      //
      // Suspense boundaries are implemented as multiple fibers, but they
      // are a single conceptual unit. The legacy mode behavior where we
      // pretend the suspended fiber committed as `null` won't work,
      // because in this case the "suspended" fiber is the inner
      // Offscreen wrapper.
      //
      // Because the contents of the boundary haven't started rendering
      // yet (i.e. nothing in the tree has partially rendered) we can
      // switch to the regular, concurrent mode behavior: mark the
      // boundary with ShouldCapture and enter the unwind phase.
      suspenseBoundary.flags |= ShouldCapture;
    } else {
      suspenseBoundary.flags |= DidCapture;
      sourceFiber.flags |= ForceUpdateForLegacySuspense; // We're going to commit this fiber even though it didn't complete.
      // But we shouldn't call any lifecycle methods or callbacks. Remove
      // all lifecycle effect tags.

      sourceFiber.flags &= ~(LifecycleEffectMask | Incomplete);

      if (sourceFiber.tag === ClassComponent) {
        var currentSourceFiber = sourceFiber.alternate;

        if (currentSourceFiber === null) {
          // This is a new mount. Change the tag so it's not mistaken for a
          // completed class component. For example, we should not call
          // componentWillUnmount if it is deleted.
          sourceFiber.tag = IncompleteClassComponent;
        } else {
          // When we try rendering again, we should not reuse the current fiber,
          // since it's known to be in an inconsistent state. Use a force update to
          // prevent a bail out.
          var update = createUpdate(NoTimestamp, SyncLane);
          update.tag = ForceUpdate;
          enqueueUpdate$1(sourceFiber, update, SyncLane);
        }
      } // The source fiber did not complete. Mark it with Sync priority to
      // indicate that it still has pending work.


      sourceFiber.lanes = mergeLanes(sourceFiber.lanes, SyncLane);
    }

    return suspenseBoundary;
  } // Confirmed that the boundary is in a concurrent mode tree. Continue
  // with the normal suspend path.
  //
  // After this we'll use a set of heuristics to determine whether this
  // render pass will run to completion or restart or "suspend" the commit.
  // The actual logic for this is spread out in different places.
  //
  // This first principle is that if we're going to suspend when we complete
  // a root, then we should also restart if we get an update or ping that
  // might unsuspend it, and vice versa. The only reason to suspend is
  // because you think you might want to restart before committing. However,
  // it doesn't make sense to restart only while in the period we're suspended.
  //
  // Restarting too aggressively is also not good because it starves out any
  // intermediate loading state. So we use heuristics to determine when.
  // Suspense Heuristics
  //
  // If nothing threw a Promise or all the same fallbacks are already showing,
  // then don't suspend/restart.
  //
  // If this is an initial render of a new tree of Suspense boundaries and
  // those trigger a fallback, then don't suspend/restart. We want to ensure
  // that we can show the initial loading state as quickly as possible.
  //
  // If we hit a "Delayed" case, such as when we'd switch from content back into
  // a fallback, then we should always suspend/restart. Transitions apply
  // to this case. If none is defined, JND is used instead.
  //
  // If we're already showing a fallback and it gets "retried", allowing us to show
  // another level, but there's still an inner boundary that would show a fallback,
  // then we suspend/restart for 500ms since the last time we showed a fallback
  // anywhere in the tree. This effectively throttles progressive loading into a
  // consistent train of commits. This also gives us an opportunity to restart to
  // get to the completed state slightly earlier.
  //
  // If there's ambiguity due to batching it's resolved in preference of:
  // 1) "delayed", 2) "initial render", 3) "retry".
  //
  // We want to ensure that a "busy" state doesn't get force committed. We want to
  // ensure that new initial loading states can commit as soon as possible.


  suspenseBoundary.flags |= ShouldCapture; // TODO: I think we can remove this, since we now use `DidCapture` in
  // the begin phase to prevent an early bailout.

  suspenseBoundary.lanes = rootRenderLanes;
  return suspenseBoundary;
}

function throwException(root, returnFiber, sourceFiber, value, rootRenderLanes) {
  // The source fiber did not complete.
  sourceFiber.flags |= Incomplete;

  {
    if (isDevToolsPresent) {
      // If we have pending work still, restore the original updaters
      restorePendingUpdaters(root, rootRenderLanes);
    }
  }

  if (value !== null && typeof value === 'object' && typeof value.then === 'function') {
    // This is a wakeable. The component suspended.
    var wakeable = value;
    resetSuspendedComponent(sourceFiber);


    var suspenseBoundary = getSuspenseHandler();

    if (suspenseBoundary !== null) {
      switch (suspenseBoundary.tag) {
        case SuspenseComponent:
          {
            // If this suspense boundary is not already showing a fallback, mark
            // the in-progress render as suspended. We try to perform this logic
            // as soon as soon as possible during the render phase, so the work
            // loop can know things like whether it's OK to switch to other tasks,
            // or whether it can wait for data to resolve before continuing.
            // TODO: Most of these checks are already performed when entering a
            // Suspense boundary. We should track the information on the stack so
            // we don't have to recompute it on demand. This would also allow us
            // to unify with `use` which needs to perform this logic even sooner,
            // before `throwException` is called.
            if (sourceFiber.mode & ConcurrentMode) {
              if (getShellBoundary() === null) {
                // Suspended in the "shell" of the app. This is an undesirable
                // loading state. We should avoid committing this tree.
                renderDidSuspendDelayIfPossible();
              } else {
                // If we suspended deeper than the shell, we don't need to delay
                // the commmit. However, we still call renderDidSuspend if this is
                // a new boundary, to tell the work loop that a new fallback has
                // appeared during this render.
                // TODO: Theoretically we should be able to delete this branch.
                // It's currently used for two things: 1) to throttle the
                // appearance of successive loading states, and 2) in
                // SuspenseList, to determine whether the children include any
                // pending fallbacks. For 1, we should apply throttling to all
                // retries, not just ones that render an additional fallback. For
                // 2, we should check subtreeFlags instead. Then we can delete
                // this branch.
                var current = suspenseBoundary.alternate;

                if (current === null) {
                  renderDidSuspend();
                }
              }
            }

            suspenseBoundary.flags &= ~ForceClientRender;
            markSuspenseBoundaryShouldCapture(suspenseBoundary, returnFiber, sourceFiber, root, rootRenderLanes); // Retry listener
            //
            // If the fallback does commit, we need to attach a different type of
            // listener. This one schedules an update on the Suspense boundary to
            // turn the fallback state off.
            //
            // Stash the wakeable on the boundary fiber so we can access it in the
            // commit phase.
            //
            // When the wakeable resolves, we'll attempt to render the boundary
            // again ("retry").

            var wakeables = suspenseBoundary.updateQueue;

            if (wakeables === null) {
              suspenseBoundary.updateQueue = new Set([wakeable]);
            } else {
              wakeables.add(wakeable);
            }

            break;
          }

        case OffscreenComponent:
          {
            if (suspenseBoundary.mode & ConcurrentMode) {
              suspenseBoundary.flags |= ShouldCapture;
              var offscreenQueue = suspenseBoundary.updateQueue;

              if (offscreenQueue === null) {
                var newOffscreenQueue = {
                  transitions: null,
                  markerInstances: null,
                  wakeables: new Set([wakeable])
                };
                suspenseBoundary.updateQueue = newOffscreenQueue;
              } else {
                var _wakeables = offscreenQueue.wakeables;

                if (_wakeables === null) {
                  offscreenQueue.wakeables = new Set([wakeable]);
                } else {
                  _wakeables.add(wakeable);
                }
              }

              break;
            }
          }
        // eslint-disable-next-line no-fallthrough

        default:
          {
            throw new Error("Unexpected Suspense handler tag (" + suspenseBoundary.tag + "). This " + 'is a bug in React.');
          }
      } // We only attach ping listeners in concurrent mode. Legacy Suspense always
      // commits fallbacks synchronously, so there are no pings.


      if (suspenseBoundary.mode & ConcurrentMode) {
        attachPingListener(root, wakeable, rootRenderLanes);
      }

      return;
    } else {
      // No boundary was found. Unless this is a sync update, this is OK.
      // We can suspend and wait for more data to arrive.
      if (root.tag === ConcurrentRoot) {
        // In a concurrent root, suspending without a Suspense boundary is
        // allowed. It will suspend indefinitely without committing.
        //
        // TODO: Should we have different behavior for discrete updates? What
        // about flushSync? Maybe it should put the tree into an inert state,
        // and potentially log a warning. Revisit this for a future release.
        attachPingListener(root, wakeable, rootRenderLanes);
        renderDidSuspendDelayIfPossible();
        return;
      } else {
        // In a legacy root, suspending without a boundary is always an error.
        var uncaughtSuspenseError = new Error('A component suspended while responding to synchronous input. This ' + 'will cause the UI to be replaced with a loading indicator. To ' + 'fix, updates that suspend should be wrapped ' + 'with startTransition.');
        value = uncaughtSuspenseError;
      }
    }
  } else {
    // This is a regular error, not a Suspense wakeable.
    if (getIsHydrating() && sourceFiber.mode & ConcurrentMode) {

      var _suspenseBoundary = getSuspenseHandler(); // If the error was thrown during hydration, we may be able to recover by
      // discarding the dehydrated content and switching to a client render.
      // Instead of surfacing the error, find the nearest Suspense boundary
      // and render it again without hydration.


      if (_suspenseBoundary !== null) {
        if ((_suspenseBoundary.flags & ShouldCapture) === NoFlags) {
          // Set a flag to indicate that we should try rendering the normal
          // children again, not the fallback.
          _suspenseBoundary.flags |= ForceClientRender;
        }

        markSuspenseBoundaryShouldCapture(_suspenseBoundary, returnFiber, sourceFiber, root, rootRenderLanes); // Even though the user may not be affected by this error, we should
        // still log it so it can be fixed.

        queueHydrationError(createCapturedValueAtFiber(value, sourceFiber));
        return;
      }
    }
  }

  value = createCapturedValueAtFiber(value, sourceFiber);
  renderDidError(value); // We didn't find a boundary that could handle this type of exception. Start
  // over and traverse parent path again, this time treating the exception
  // as an error.

  var workInProgress = returnFiber;

  do {
    switch (workInProgress.tag) {
      case HostRoot:
        {
          var _errorInfo = value;
          workInProgress.flags |= ShouldCapture;
          var lane = pickArbitraryLane(rootRenderLanes);
          workInProgress.lanes = mergeLanes(workInProgress.lanes, lane);
          var update = createRootErrorUpdate(workInProgress, _errorInfo, lane);
          enqueueCapturedUpdate(workInProgress, update);
          return;
        }

      case ClassComponent:
        // Capture and retry
        var errorInfo = value;
        var ctor = workInProgress.type;
        var instance = workInProgress.stateNode;

        if ((workInProgress.flags & DidCapture) === NoFlags && (typeof ctor.getDerivedStateFromError === 'function' || instance !== null && typeof instance.componentDidCatch === 'function' && !isAlreadyFailedLegacyErrorBoundary(instance))) {
          workInProgress.flags |= ShouldCapture;

          var _lane = pickArbitraryLane(rootRenderLanes);

          workInProgress.lanes = mergeLanes(workInProgress.lanes, _lane); // Schedule the error boundary to re-render using updated state

          var _update = createClassErrorUpdate(workInProgress, errorInfo, _lane);

          enqueueCapturedUpdate(workInProgress, _update);
          return;
        }

        break;
    } // $FlowFixMe[incompatible-type] we bail out when we get a null


    workInProgress = workInProgress.return;
  } while (workInProgress !== null);
}

var ReactCurrentOwner$1 = ReactSharedInternals.ReactCurrentOwner; // A special exception that's used to unwind the stack when an update flows
// into a dehydrated boundary.

var SelectiveHydrationException = new Error("This is not a real error. It's an implementation detail of React's " + "selective hydration feature. If this leaks into userspace, it's a bug in " + 'React. Please file an issue.');
var didReceiveUpdate = false;

function reconcileChildren(current, workInProgress, nextChildren, renderLanes) {
  if (current === null) {
    // If this is a fresh new component that hasn't been rendered yet, we
    // won't update its child set by applying minimal side-effects. Instead,
    // we will add them all to the child before it gets rendered. That means
    // we can optimize this reconciliation pass by not tracking side-effects.
    workInProgress.child = mountChildFibers(workInProgress, null, nextChildren, renderLanes);
  } else {
    // If the current child is the same as the work in progress, it means that
    // we haven't yet started any work on these children. Therefore, we use
    // the clone algorithm to create a copy of all the current children.
    // If we had any progressed work already, that is invalid at this point so
    // let's throw it out.
    workInProgress.child = reconcileChildFibers(workInProgress, current.child, nextChildren, renderLanes);
  }
}

function forceUnmountCurrentAndReconcile(current, workInProgress, nextChildren, renderLanes) {
  // This function is fork of reconcileChildren. It's used in cases where we
  // want to reconcile without matching against the existing set. This has the
  // effect of all current children being unmounted; even if the type and key
  // are the same, the old child is unmounted and a new child is created.
  //
  // To do this, we're going to go through the reconcile algorithm twice. In
  // the first pass, we schedule a deletion for all the current children by
  // passing null.
  workInProgress.child = reconcileChildFibers(workInProgress, current.child, null, renderLanes); // In the second pass, we mount the new children. The trick here is that we
  // pass null in place of where we usually pass the current child set. This has
  // the effect of remounting all children regardless of whether their
  // identities match.

  workInProgress.child = reconcileChildFibers(workInProgress, null, nextChildren, renderLanes);
}

function updateForwardRef(current, workInProgress, Component, nextProps, renderLanes) {

  var render = Component.render;
  var ref = workInProgress.ref; // The rest is a fork of updateFunctionComponent

  var nextChildren;
  var hasId;
  prepareToReadContext(workInProgress, renderLanes);

  {
    markComponentRenderStarted(workInProgress);
  }

  {
    nextChildren = renderWithHooks(current, workInProgress, render, nextProps, ref, renderLanes);
    hasId = checkDidRenderIdHook();
  }

  {
    markComponentRenderStopped();
  }

  if (current !== null && !didReceiveUpdate) {
    bailoutHooks(current, workInProgress, renderLanes);
    return bailoutOnAlreadyFinishedWork(current, workInProgress, renderLanes);
  }

  if (getIsHydrating() && hasId) {
    pushMaterializedTreeId(workInProgress);
  } // React DevTools reads this flag.


  workInProgress.flags |= PerformedWork;
  reconcileChildren(current, workInProgress, nextChildren, renderLanes);
  return workInProgress.child;
}

function updateMemoComponent(current, workInProgress, Component, nextProps, renderLanes) {
  if (current === null) {
    var type = Component.type;

    if (isSimpleFunctionComponent(type) && Component.compare === null && // SimpleMemoComponent codepath doesn't resolve outer props either.
    Component.defaultProps === undefined) {
      var resolvedType = type;
      // and with only the default shallow comparison, we upgrade it
      // to a SimpleMemoComponent to allow fast path updates.


      workInProgress.tag = SimpleMemoComponent;
      workInProgress.type = resolvedType;

      return updateSimpleMemoComponent(current, workInProgress, resolvedType, nextProps, renderLanes);
    }

    var child = createFiberFromTypeAndProps(Component.type, null, nextProps, workInProgress, workInProgress.mode, renderLanes);
    child.ref = workInProgress.ref;
    child.return = workInProgress;
    workInProgress.child = child;
    return child;
  }

  var currentChild = current.child; // This is always exactly one child

  var hasScheduledUpdateOrContext = checkScheduledUpdateOrContext(current, renderLanes);

  if (!hasScheduledUpdateOrContext) {
    // This will be the props with resolved defaultProps,
    // unlike current.memoizedProps which will be the unresolved ones.
    var prevProps = currentChild.memoizedProps; // Default to shallow comparison

    var compare = Component.compare;
    compare = compare !== null ? compare : shallowEqual;

    if (compare(prevProps, nextProps) && current.ref === workInProgress.ref) {
      return bailoutOnAlreadyFinishedWork(current, workInProgress, renderLanes);
    }
  } // React DevTools reads this flag.


  workInProgress.flags |= PerformedWork;
  var newChild = createWorkInProgress(currentChild, nextProps);
  newChild.ref = workInProgress.ref;
  newChild.return = workInProgress;
  workInProgress.child = newChild;
  return newChild;
}

function updateSimpleMemoComponent(current, workInProgress, Component, nextProps, renderLanes) {

  if (current !== null) {
    var prevProps = current.memoizedProps;

    if (shallowEqual(prevProps, nextProps) && current.ref === workInProgress.ref && ( // Prevent bailout if the implementation changed due to hot reload.
     true)) {
      didReceiveUpdate = false; // The props are shallowly equal. Reuse the previous props object, like we
      // would during a normal fiber bailout.
      //
      // We don't have strong guarantees that the props object is referentially
      // equal during updates where we can't bail out anyway — like if the props
      // are shallowly equal, but there's a local state or context update in the
      // same batch.
      //
      // However, as a principle, we should aim to make the behavior consistent
      // across different ways of memoizing a component. For example, React.memo
      // has a different internal Fiber layout if you pass a normal function
      // component (SimpleMemoComponent) versus if you pass a different type
      // like forwardRef (MemoComponent). But this is an implementation detail.
      // Wrapping a component in forwardRef (or React.lazy, etc) shouldn't
      // affect whether the props object is reused during a bailout.

      workInProgress.pendingProps = nextProps = prevProps;

      if (!checkScheduledUpdateOrContext(current, renderLanes)) {
        // The pending lanes were cleared at the beginning of beginWork. We're
        // about to bail out, but there might be other lanes that weren't
        // included in the current render. Usually, the priority level of the
        // remaining updates is accumulated during the evaluation of the
        // component (i.e. when processing the update queue). But since since
        // we're bailing out early *without* evaluating the component, we need
        // to account for it here, too. Reset to the value of the current fiber.
        // NOTE: This only applies to SimpleMemoComponent, not MemoComponent,
        // because a MemoComponent fiber does not have hooks or an update queue;
        // rather, it wraps around an inner component, which may or may not
        // contains hooks.
        // TODO: Move the reset at in beginWork out of the common path so that
        // this is no longer necessary.
        workInProgress.lanes = current.lanes;
        return bailoutOnAlreadyFinishedWork(current, workInProgress, renderLanes);
      } else if ((current.flags & ForceUpdateForLegacySuspense) !== NoFlags) {
        // This is a special case that only exists for legacy mode.
        // See https://github.com/facebook/react/pull/19216.
        didReceiveUpdate = true;
      }
    }
  }

  return updateFunctionComponent(current, workInProgress, Component, nextProps, renderLanes);
}

function updateOffscreenComponent(current, workInProgress, renderLanes) {
  var nextProps = workInProgress.pendingProps;
  var nextChildren = nextProps.children;
  var nextIsDetached = (workInProgress.stateNode._pendingVisibility & OffscreenDetached) !== 0;
  var prevState = current !== null ? current.memoizedState : null;
  markRef(current, workInProgress);

  if (nextProps.mode === 'hidden' || enableLegacyHidden  || nextIsDetached) {
    // Rendering a hidden tree.
    var didSuspend = (workInProgress.flags & DidCapture) !== NoFlags;

    if (didSuspend) {
      // Something suspended inside a hidden tree
      // Include the base lanes from the last render
      var nextBaseLanes = prevState !== null ? mergeLanes(prevState.baseLanes, renderLanes) : renderLanes;

      if (current !== null) {
        // Reset to the current children
        var currentChild = workInProgress.child = current.child; // The current render suspended, but there may be other lanes with
        // pending work. We can't read `childLanes` from the current Offscreen
        // fiber because we reset it when it was deferred; however, we can read
        // the pending lanes from the child fibers.

        var currentChildLanes = NoLanes;

        while (currentChild !== null) {
          currentChildLanes = mergeLanes(mergeLanes(currentChildLanes, currentChild.lanes), currentChild.childLanes);
          currentChild = currentChild.sibling;
        }

        var lanesWeJustAttempted = nextBaseLanes;
        var remainingChildLanes = removeLanes(currentChildLanes, lanesWeJustAttempted);
        workInProgress.childLanes = remainingChildLanes;
      } else {
        workInProgress.childLanes = NoLanes;
        workInProgress.child = null;
      }

      return deferHiddenOffscreenComponent(current, workInProgress, nextBaseLanes);
    }

    if ((workInProgress.mode & ConcurrentMode) === NoMode) {
      // In legacy sync mode, don't defer the subtree. Render it now.
      // TODO: Consider how Offscreen should work with transitions in the future
      var nextState = {
        baseLanes: NoLanes,
        cachePool: null
      };
      workInProgress.memoizedState = nextState;

      {
        // push the cache pool even though we're going to bail out
        // because otherwise there'd be a context mismatch
        if (current !== null) {
          pushTransition(workInProgress, null);
        }
      }

      reuseHiddenContextOnStack();
      pushOffscreenSuspenseHandler(workInProgress);
    } else if (!includesSomeLane(renderLanes, OffscreenLane)) {
      // We're hidden, and we're not rendering at Offscreen. We will bail out
      // and resume this tree later.
      // Schedule this fiber to re-render at Offscreen priority
      workInProgress.lanes = workInProgress.childLanes = laneToLanes(OffscreenLane); // Include the base lanes from the last render

      var _nextBaseLanes = prevState !== null ? mergeLanes(prevState.baseLanes, renderLanes) : renderLanes;

      return deferHiddenOffscreenComponent(current, workInProgress, _nextBaseLanes);
    } else {
      // This is the second render. The surrounding visible content has already
      // committed. Now we resume rendering the hidden tree.
      // Rendering at offscreen, so we can clear the base lanes.
      var _nextState = {
        baseLanes: NoLanes,
        cachePool: null
      };
      workInProgress.memoizedState = _nextState;

      if ( current !== null) {
        // If the render that spawned this one accessed the cache pool, resume
        // using the same cache. Unless the parent changed, since that means
        // there was a refresh.
        var prevCachePool = prevState !== null ? prevState.cachePool : null; // TODO: Consider if and how Offscreen pre-rendering should
        // be attributed to the transition that spawned it

        pushTransition(workInProgress, prevCachePool);
      } // Push the lanes that were skipped when we bailed out.


      if (prevState !== null) {
        pushHiddenContext(workInProgress, prevState);
      } else {
        reuseHiddenContextOnStack();
      }

      pushOffscreenSuspenseHandler(workInProgress);
    }
  } else {
    // Rendering a visible tree.
    if (prevState !== null) {
      // We're going from hidden -> visible.
      var _prevCachePool = null;

      {
        // If the render that spawned this one accessed the cache pool, resume
        // using the same cache. Unless the parent changed, since that means
        // there was a refresh.
        _prevCachePool = prevState.cachePool;
      }

      pushTransition(workInProgress, _prevCachePool); // Push the lanes that were skipped when we bailed out.

      pushHiddenContext(workInProgress, prevState);
      reuseSuspenseHandlerOnStack(); // Since we're not hidden anymore, reset the state

      workInProgress.memoizedState = null;
    } else {
      // We weren't previously hidden, and we still aren't, so there's nothing
      // special to do. Need to push to the stack regardless, though, to avoid
      // a push/pop misalignment.
      {
        // If the render that spawned this one accessed the cache pool, resume
        // using the same cache. Unless the parent changed, since that means
        // there was a refresh.
        if (current !== null) {
          pushTransition(workInProgress, null);
        }
      } // We're about to bail out, but we need to push this to the stack anyway
      // to avoid a push/pop misalignment.


      reuseHiddenContextOnStack();
      reuseSuspenseHandlerOnStack();
    }
  }

  reconcileChildren(current, workInProgress, nextChildren, renderLanes);
  return workInProgress.child;
}

function deferHiddenOffscreenComponent(current, workInProgress, nextBaseLanes, renderLanes) {
  var nextState = {
    baseLanes: nextBaseLanes,
    // Save the cache pool so we can resume later.
    cachePool:  getOffscreenDeferredCache() 
  };
  workInProgress.memoizedState = nextState;

  {
    // push the cache pool even though we're going to bail out
    // because otherwise there'd be a context mismatch
    if (current !== null) {
      pushTransition(workInProgress, null);
    }
  } // We're about to bail out, but we need to push this to the stack anyway
  // to avoid a push/pop misalignment.


  reuseHiddenContextOnStack();
  pushOffscreenSuspenseHandler(workInProgress);

  return null;
} // Note: These happen to have identical begin phases, for now. We shouldn't hold

function updateCacheComponent(current, workInProgress, renderLanes) {

  prepareToReadContext(workInProgress, renderLanes);
  var parentCache = readContext(CacheContext);

  if (current === null) {
    // Initial mount. Request a fresh cache from the pool.
    var freshCache = requestCacheFromPool(renderLanes);
    var initialState = {
      parent: parentCache,
      cache: freshCache
    };
    workInProgress.memoizedState = initialState;
    initializeUpdateQueue(workInProgress);
    pushCacheProvider(workInProgress, freshCache);
  } else {
    // Check for updates
    if (includesSomeLane(current.lanes, renderLanes)) {
      cloneUpdateQueue(current, workInProgress);
      processUpdateQueue(workInProgress, null, null, renderLanes);
    }

    var prevState = current.memoizedState;
    var nextState = workInProgress.memoizedState; // Compare the new parent cache to the previous to see detect there was
    // a refresh.

    if (prevState.parent !== parentCache) {
      // Refresh in parent. Update the parent.
      var derivedState = {
        parent: parentCache,
        cache: parentCache
      }; // Copied from getDerivedStateFromProps implementation. Once the update
      // queue is empty, persist the derived state onto the base state.

      workInProgress.memoizedState = derivedState;

      if (workInProgress.lanes === NoLanes) {
        var updateQueue = workInProgress.updateQueue;
        workInProgress.memoizedState = updateQueue.baseState = derivedState;
      }

      pushCacheProvider(workInProgress, parentCache); // No need to propagate a context change because the refreshed parent
      // already did.
    } else {
      // The parent didn't refresh. Now check if this cache did.
      var nextCache = nextState.cache;
      pushCacheProvider(workInProgress, nextCache);

      if (nextCache !== prevState.cache) {
        // This cache refreshed. Propagate a context change.
        propagateContextChange(workInProgress, CacheContext, renderLanes);
      }
    }
  }

  var nextChildren = workInProgress.pendingProps.children;
  reconcileChildren(current, workInProgress, nextChildren, renderLanes);
  return workInProgress.child;
} // This should only be called if the name changes

function updateFragment(current, workInProgress, renderLanes) {
  var nextChildren = workInProgress.pendingProps;
  reconcileChildren(current, workInProgress, nextChildren, renderLanes);
  return workInProgress.child;
}

function updateMode(current, workInProgress, renderLanes) {
  var nextChildren = workInProgress.pendingProps.children;
  reconcileChildren(current, workInProgress, nextChildren, renderLanes);
  return workInProgress.child;
}

function updateProfiler(current, workInProgress, renderLanes) {
  {
    workInProgress.flags |= Update;

    {
      // Reset effect durations for the next eventual effect phase.
      // These are reset during render to allow the DevTools commit hook a chance to read them,
      var stateNode = workInProgress.stateNode;
      stateNode.effectDuration = 0;
      stateNode.passiveEffectDuration = 0;
    }
  }

  var nextProps = workInProgress.pendingProps;
  var nextChildren = nextProps.children;
  reconcileChildren(current, workInProgress, nextChildren, renderLanes);
  return workInProgress.child;
}

function markRef(current, workInProgress) {
  var ref = workInProgress.ref;

  if (current === null && ref !== null || current !== null && current.ref !== ref) {
    // Schedule a Ref effect
    workInProgress.flags |= Ref;
    workInProgress.flags |= RefStatic;
  }
}

function updateFunctionComponent(current, workInProgress, Component, nextProps, renderLanes) {

  var context;

  {
    var unmaskedContext = getUnmaskedContext(workInProgress, Component, true);
    context = getMaskedContext(workInProgress, unmaskedContext);
  }

  var nextChildren;
  var hasId;
  prepareToReadContext(workInProgress, renderLanes);

  {
    markComponentRenderStarted(workInProgress);
  }

  {
    nextChildren = renderWithHooks(current, workInProgress, Component, nextProps, context, renderLanes);
    hasId = checkDidRenderIdHook();
  }

  {
    markComponentRenderStopped();
  }

  if (current !== null && !didReceiveUpdate) {
    bailoutHooks(current, workInProgress, renderLanes);
    return bailoutOnAlreadyFinishedWork(current, workInProgress, renderLanes);
  }

  if (getIsHydrating() && hasId) {
    pushMaterializedTreeId(workInProgress);
  } // React DevTools reads this flag.


  workInProgress.flags |= PerformedWork;
  reconcileChildren(current, workInProgress, nextChildren, renderLanes);
  return workInProgress.child;
}

function replayFunctionComponent(current, workInProgress, nextProps, Component, renderLanes) {
  // This function is used to replay a component that previously suspended,
  // after its data resolves. It's a simplified version of
  // updateFunctionComponent that reuses the hooks from the previous attempt.
  var context;

  {
    var unmaskedContext = getUnmaskedContext(workInProgress, Component, true);
    context = getMaskedContext(workInProgress, unmaskedContext);
  }

  prepareToReadContext(workInProgress, renderLanes);

  {
    markComponentRenderStarted(workInProgress);
  }

  var nextChildren = replaySuspendedComponentWithHooks(current, workInProgress, Component, nextProps, context);
  var hasId = checkDidRenderIdHook();

  {
    markComponentRenderStopped();
  }

  if (current !== null && !didReceiveUpdate) {
    bailoutHooks(current, workInProgress, renderLanes);
    return bailoutOnAlreadyFinishedWork(current, workInProgress, renderLanes);
  }

  if (getIsHydrating() && hasId) {
    pushMaterializedTreeId(workInProgress);
  } // React DevTools reads this flag.


  workInProgress.flags |= PerformedWork;
  reconcileChildren(current, workInProgress, nextChildren, renderLanes);
  return workInProgress.child;
}

function updateClassComponent(current, workInProgress, Component, nextProps, renderLanes) {
  // During mounting we don't know the child context yet as the instance doesn't exist.
  // We will invalidate the child context in finishClassComponent() right after rendering.


  var hasContext;

  if (isContextProvider(Component)) {
    hasContext = true;
    pushContextProvider(workInProgress);
  } else {
    hasContext = false;
  }

  prepareToReadContext(workInProgress, renderLanes);
  var instance = workInProgress.stateNode;
  var shouldUpdate;

  if (instance === null) {
    resetSuspendedCurrentOnMountInLegacyMode(current, workInProgress); // In the initial pass we might need to construct the instance.

    constructClassInstance(workInProgress, Component, nextProps);
    mountClassInstance(workInProgress, Component, nextProps, renderLanes);
    shouldUpdate = true;
  } else if (current === null) {
    // In a resume, we'll already have an instance we can reuse.
    shouldUpdate = resumeMountClassInstance(workInProgress, Component, nextProps, renderLanes);
  } else {
    shouldUpdate = updateClassInstance(current, workInProgress, Component, nextProps, renderLanes);
  }

  var nextUnitOfWork = finishClassComponent(current, workInProgress, Component, shouldUpdate, hasContext, renderLanes);

  return nextUnitOfWork;
}

function finishClassComponent(current, workInProgress, Component, shouldUpdate, hasContext, renderLanes) {
  // Refs should update even if shouldComponentUpdate returns false
  markRef(current, workInProgress);
  var didCaptureError = (workInProgress.flags & DidCapture) !== NoFlags;

  if (!shouldUpdate && !didCaptureError) {
    // Context providers should defer to sCU for rendering
    if (hasContext) {
      invalidateContextProvider(workInProgress, Component, false);
    }

    return bailoutOnAlreadyFinishedWork(current, workInProgress, renderLanes);
  }

  var instance = workInProgress.stateNode; // Rerender

  ReactCurrentOwner$1.current = workInProgress;
  var nextChildren;

  if (didCaptureError && typeof Component.getDerivedStateFromError !== 'function') {
    // If we captured an error, but getDerivedStateFromError is not defined,
    // unmount all the children. componentDidCatch will schedule an update to
    // re-render a fallback. This is temporary until we migrate everyone to
    // the new API.
    // TODO: Warn in a future release.
    nextChildren = null;

    {
      stopProfilerTimerIfRunning();
    }
  } else {
    {
      markComponentRenderStarted(workInProgress);
    }

    {
      nextChildren = instance.render();
    }

    {
      markComponentRenderStopped();
    }
  } // React DevTools reads this flag.


  workInProgress.flags |= PerformedWork;

  if (current !== null && didCaptureError) {
    // If we're recovering from an error, reconcile without reusing any of
    // the existing children. Conceptually, the normal children and the children
    // that are shown on error are two different sets, so we shouldn't reuse
    // normal children even if their identities match.
    forceUnmountCurrentAndReconcile(current, workInProgress, nextChildren, renderLanes);
  } else {
    reconcileChildren(current, workInProgress, nextChildren, renderLanes);
  } // Memoize state using the values we just used to render.
  // TODO: Restructure so we never read values from the instance.


  workInProgress.memoizedState = instance.state; // The context might have changed so we need to recalculate it.

  if (hasContext) {
    invalidateContextProvider(workInProgress, Component, true);
  }

  return workInProgress.child;
}

function pushHostRootContext(workInProgress) {
  var root = workInProgress.stateNode;

  if (root.pendingContext) {
    pushTopLevelContextObject(workInProgress, root.pendingContext, root.pendingContext !== root.context);
  } else if (root.context) {
    // Should always be set
    pushTopLevelContextObject(workInProgress, root.context, false);
  }

  pushHostContainer(workInProgress, root.containerInfo);
}

function updateHostRoot(current, workInProgress, renderLanes) {
  pushHostRootContext(workInProgress);

  if (current === null) {
    throw new Error('Should have a current fiber. This is a bug in React.');
  }

  var nextProps = workInProgress.pendingProps;
  var prevState = workInProgress.memoizedState;
  var prevChildren = prevState.element;
  cloneUpdateQueue(current, workInProgress);
  processUpdateQueue(workInProgress, nextProps, null, renderLanes);
  var nextState = workInProgress.memoizedState;
  var root = workInProgress.stateNode;

  {
    var nextCache = nextState.cache;
    pushCacheProvider(workInProgress, nextCache);

    if (nextCache !== prevState.cache) {
      // The root cache refreshed.
      propagateContextChange(workInProgress, CacheContext, renderLanes);
    }
  } // Caution: React DevTools currently depends on this property
  // being called "element".


  var nextChildren = nextState.element;

  if (supportsHydration && prevState.isDehydrated) {
    // This is a hydration root whose shell has not yet hydrated. We should
    // attempt to hydrate.
    // Flip isDehydrated to false to indicate that when this render
    // finishes, the root will no longer be dehydrated.
    var overrideState = {
      element: nextChildren,
      isDehydrated: false,
      cache: nextState.cache
    };
    var updateQueue = workInProgress.updateQueue; // `baseState` can always be the last state because the root doesn't
    // have reducer functions so it doesn't need rebasing.

    updateQueue.baseState = overrideState;
    workInProgress.memoizedState = overrideState;

    if (workInProgress.flags & ForceClientRender) {
      // Something errored during a previous attempt to hydrate the shell, so we
      // forced a client render.
      var recoverableError = createCapturedValueAtFiber(new Error('There was an error while hydrating. Because the error happened outside ' + 'of a Suspense boundary, the entire root will switch to ' + 'client rendering.'), workInProgress);
      return mountHostRootWithoutHydrating(current, workInProgress, nextChildren, renderLanes, recoverableError);
    } else if (nextChildren !== prevChildren) {
      var _recoverableError = createCapturedValueAtFiber(new Error('This root received an early update, before anything was able ' + 'hydrate. Switched the entire root to client rendering.'), workInProgress);

      return mountHostRootWithoutHydrating(current, workInProgress, nextChildren, renderLanes, _recoverableError);
    } else {
      // The outermost shell has not hydrated yet. Start hydrating.
      enterHydrationState(workInProgress);

      var child = mountChildFibers(workInProgress, null, nextChildren, renderLanes);
      workInProgress.child = child;
      var node = child;

      while (node) {
        // Mark each child as hydrating. This is a fast path to know whether this
        // tree is part of a hydrating tree. This is used to determine if a child
        // node has fully mounted yet, and for scheduling event replaying.
        // Conceptually this is similar to Placement in that a new subtree is
        // inserted into the React tree here. It just happens to not need DOM
        // mutations because it already exists.
        node.flags = node.flags & ~Placement | Hydrating;
        node = node.sibling;
      }
    }
  } else {
    // Root is not dehydrated. Either this is a client-only root, or it
    // already hydrated.
    resetHydrationState();

    if (nextChildren === prevChildren) {
      return bailoutOnAlreadyFinishedWork(current, workInProgress, renderLanes);
    }

    reconcileChildren(current, workInProgress, nextChildren, renderLanes);
  }

  return workInProgress.child;
}

function mountHostRootWithoutHydrating(current, workInProgress, nextChildren, renderLanes, recoverableError) {
  // Revert to client rendering.
  resetHydrationState();
  queueHydrationError(recoverableError);
  workInProgress.flags |= ForceClientRender;
  reconcileChildren(current, workInProgress, nextChildren, renderLanes);
  return workInProgress.child;
}

function updateHostComponent(current, workInProgress, renderLanes) {
  pushHostContext(workInProgress);

  if (current === null) {
    tryToClaimNextHydratableInstance(workInProgress);
  }

  var type = workInProgress.type;
  var nextProps = workInProgress.pendingProps;
  var prevProps = current !== null ? current.memoizedProps : null;
  var nextChildren = nextProps.children;
  var isDirectTextChild = shouldSetTextContent(type, nextProps);

  if (isDirectTextChild) {
    // We special case a direct text child of a host node. This is a common
    // case. We won't handle it as a reified child. We will instead handle
    // this in the host environment that also has access to this prop. That
    // avoids allocating another HostText fiber and traversing it.
    nextChildren = null;
  } else if (prevProps !== null && shouldSetTextContent(type, prevProps)) {
    // If we're switching from a direct text child to a normal child, or to
    // empty, we need to schedule the text content to be reset.
    workInProgress.flags |= ContentReset;
  }

  markRef(current, workInProgress);
  reconcileChildren(current, workInProgress, nextChildren, renderLanes);
  return workInProgress.child;
}

function updateHostResource(current, workInProgress, renderLanes) {
  pushHostContext(workInProgress);
  markRef(current, workInProgress);
  var currentProps = current === null ? null : current.memoizedProps;
  workInProgress.memoizedState = getResource(workInProgress.type, workInProgress.pendingProps, currentProps); // Resources never have reconciler managed children. It is possible for
  // the host implementation of getResource to consider children in the
  // resource construction but they will otherwise be discarded. In practice
  // this precludes all but the simplest children and Host specific warnings
  // should be implemented to warn when children are passsed when otherwise not
  // expected

  return null;
}

function updateHostSingleton(current, workInProgress, renderLanes) {
  pushHostContext(workInProgress);

  if (current === null) {
    claimHydratableSingleton(workInProgress);
  }

  var nextChildren = workInProgress.pendingProps.children;

  if (current === null && !getIsHydrating()) {
    // Similar to Portals we append Singleton children in the commit phase. So we
    // Track insertions even on mount.
    // TODO: Consider unifying this with how the root works.
    workInProgress.child = reconcileChildFibers(workInProgress, null, nextChildren, renderLanes);
  } else {
    reconcileChildren(current, workInProgress, nextChildren, renderLanes);
  }

  markRef(current, workInProgress);
  return workInProgress.child;
}

function updateHostText(current, workInProgress) {
  if (current === null) {
    tryToClaimNextHydratableInstance(workInProgress);
  } // Nothing to do here. This is terminal. We'll do the completion step
  // immediately after.


  return null;
}

function mountLazyComponent(_current, workInProgress, elementType, renderLanes) {
  resetSuspendedCurrentOnMountInLegacyMode(_current, workInProgress);
  var props = workInProgress.pendingProps;
  var lazyComponent = elementType;
  var payload = lazyComponent._payload;
  var init = lazyComponent._init;
  var Component = init(payload); // Store the unwrapped component in the type.

  workInProgress.type = Component;
  var resolvedTag = workInProgress.tag = resolveLazyComponentTag(Component);
  var resolvedProps = resolveDefaultProps(Component, props);
  var child;

  switch (resolvedTag) {
    case FunctionComponent:
      {

        child = updateFunctionComponent(null, workInProgress, Component, resolvedProps, renderLanes);
        return child;
      }

    case ClassComponent:
      {

        child = updateClassComponent(null, workInProgress, Component, resolvedProps, renderLanes);
        return child;
      }

    case ForwardRef:
      {

        child = updateForwardRef(null, workInProgress, Component, resolvedProps, renderLanes);
        return child;
      }

    case MemoComponent:
      {

        child = updateMemoComponent(null, workInProgress, Component, resolveDefaultProps(Component.type, resolvedProps), // The inner type can have defaults too
        renderLanes);
        return child;
      }
  }

  var hint = '';
  // because the fact that it's a separate type of work is an
  // implementation detail.


  throw new Error("Element type is invalid. Received a promise that resolves to: " + Component + ". " + ("Lazy element type must resolve to a class or function." + hint));
}

function mountIncompleteClassComponent(_current, workInProgress, Component, nextProps, renderLanes) {
  resetSuspendedCurrentOnMountInLegacyMode(_current, workInProgress); // Promote the fiber to a class and try rendering again.

  workInProgress.tag = ClassComponent; // The rest of this function is a fork of `updateClassComponent`
  // Push context providers early to prevent context stack mismatches.
  // During mounting we don't know the child context yet as the instance doesn't exist.
  // We will invalidate the child context in finishClassComponent() right after rendering.

  var hasContext;

  if (isContextProvider(Component)) {
    hasContext = true;
    pushContextProvider(workInProgress);
  } else {
    hasContext = false;
  }

  prepareToReadContext(workInProgress, renderLanes);
  constructClassInstance(workInProgress, Component, nextProps);
  mountClassInstance(workInProgress, Component, nextProps, renderLanes);
  return finishClassComponent(null, workInProgress, Component, true, hasContext, renderLanes);
}

function mountIndeterminateComponent(_current, workInProgress, Component, renderLanes) {
  resetSuspendedCurrentOnMountInLegacyMode(_current, workInProgress);
  var props = workInProgress.pendingProps;
  var context;

  {
    var unmaskedContext = getUnmaskedContext(workInProgress, Component, false);
    context = getMaskedContext(workInProgress, unmaskedContext);
  }

  prepareToReadContext(workInProgress, renderLanes);
  var value;
  var hasId;

  {
    markComponentRenderStarted(workInProgress);
  }

  {
    value = renderWithHooks(null, workInProgress, Component, props, context, renderLanes);
    hasId = checkDidRenderIdHook();
  }

  {
    markComponentRenderStopped();
  } // React DevTools reads this flag.


  workInProgress.flags |= PerformedWork;

  if ( // Run these checks in production only if the flag is off.
  // Eventually we'll delete this branch altogether.
   typeof value === 'object' && value !== null && typeof value.render === 'function' && value.$$typeof === undefined) {


    workInProgress.tag = ClassComponent; // Throw out any hooks that were used.

    workInProgress.memoizedState = null;
    workInProgress.updateQueue = null; // Push context providers early to prevent context stack mismatches.
    // During mounting we don't know the child context yet as the instance doesn't exist.
    // We will invalidate the child context in finishClassComponent() right after rendering.

    var hasContext = false;

    if (isContextProvider(Component)) {
      hasContext = true;
      pushContextProvider(workInProgress);
    } else {
      hasContext = false;
    }

    workInProgress.memoizedState = value.state !== null && value.state !== undefined ? value.state : null;
    initializeUpdateQueue(workInProgress);
    adoptClassInstance(workInProgress, value);
    mountClassInstance(workInProgress, Component, props, renderLanes);
    return finishClassComponent(null, workInProgress, Component, true, hasContext, renderLanes);
  } else {
    // Proceed under the assumption that this is a function component
    workInProgress.tag = FunctionComponent;

    if (getIsHydrating() && hasId) {
      pushMaterializedTreeId(workInProgress);
    }

    reconcileChildren(null, workInProgress, value, renderLanes);

    return workInProgress.child;
  }
}

var SUSPENDED_MARKER = {
  dehydrated: null,
  treeContext: null,
  retryLane: NoLane
};

function mountSuspenseOffscreenState(renderLanes) {
  return {
    baseLanes: renderLanes,
    cachePool: getSuspendedCache()
  };
}

function updateSuspenseOffscreenState(prevOffscreenState, renderLanes) {
  var cachePool = null;

  {
    var prevCachePool = prevOffscreenState.cachePool;

    if (prevCachePool !== null) {
      var parentCache = isPrimaryRenderer ? CacheContext._currentValue : CacheContext._currentValue2;

      if (prevCachePool.parent !== parentCache) {
        // Detected a refresh in the parent. This overrides any previously
        // suspended cache.
        cachePool = {
          parent: parentCache,
          pool: parentCache
        };
      } else {
        // We can reuse the cache from last time. The only thing that would have
        // overridden it is a parent refresh, which we checked for above.
        cachePool = prevCachePool;
      }
    } else {
      // If there's no previous cache pool, grab the current one.
      cachePool = getSuspendedCache();
    }
  }

  return {
    baseLanes: mergeLanes(prevOffscreenState.baseLanes, renderLanes),
    cachePool: cachePool
  };
} // TODO: Probably should inline this back


function shouldRemainOnFallback(current, workInProgress, renderLanes) {
  // If we're already showing a fallback, there are cases where we need to
  // remain on that fallback regardless of whether the content has resolved.
  // For example, SuspenseList coordinates when nested content appears.
  if (current !== null) {
    var suspenseState = current.memoizedState;

    if (suspenseState === null) {
      // Currently showing content. Don't hide it, even if ForceSuspenseFallback
      // is true. More precise name might be "ForceRemainSuspenseFallback".
      // Note: This is a factoring smell. Can't remain on a fallback if there's
      // no fallback to remain on.
      return false;
    }
  } // Not currently showing content. Consult the Suspense context.


  var suspenseContext = suspenseStackCursor.current;
  return hasSuspenseListContext(suspenseContext, ForceSuspenseFallback);
}

function getRemainingWorkInPrimaryTree(current, renderLanes) {
  // TODO: Should not remove render lanes that were pinged during this render
  return removeLanes(current.childLanes, renderLanes);
}

function updateSuspenseComponent(current, workInProgress, renderLanes) {
  var nextProps = workInProgress.pendingProps; // This is used by DevTools to force a boundary to suspend.

  var showFallback = false;
  var didSuspend = (workInProgress.flags & DidCapture) !== NoFlags;

  if (didSuspend || shouldRemainOnFallback(current)) {
    // Something in this boundary's subtree already suspended. Switch to
    // rendering the fallback children.
    showFallback = true;
    workInProgress.flags &= ~DidCapture;
  } // OK, the next part is confusing. We're about to reconcile the Suspense
  // boundary's children. This involves some custom reconciliation logic. Two
  // main reasons this is so complicated.
  //
  // First, Legacy Mode has different semantics for backwards compatibility. The
  // primary tree will commit in an inconsistent state, so when we do the
  // second pass to render the fallback, we do some exceedingly, uh, clever
  // hacks to make that not totally break. Like transferring effects and
  // deletions from hidden tree. In Concurrent Mode, it's much simpler,
  // because we bailout on the primary tree completely and leave it in its old
  // state, no effects. Same as what we do for Offscreen (except that
  // Offscreen doesn't have the first render pass).
  //
  // Second is hydration. During hydration, the Suspense fiber has a slightly
  // different layout, where the child points to a dehydrated fragment, which
  // contains the DOM rendered by the server.
  //
  // Third, even if you set all that aside, Suspense is like error boundaries in
  // that we first we try to render one tree, and if that fails, we render again
  // and switch to a different tree. Like a try/catch block. So we have to track
  // which branch we're currently rendering. Ideally we would model this using
  // a stack.


  if (current === null) {
    // Initial mount
    // Special path for hydration
    // If we're currently hydrating, try to hydrate this boundary.
    if (getIsHydrating()) {
      // We must push the suspense handler context *before* attempting to
      // hydrate, to avoid a mismatch in case it errors.
      if (showFallback) {
        pushPrimaryTreeSuspenseHandler(workInProgress);
      } else {
        pushFallbackTreeSuspenseHandler();
      }

      tryToClaimNextHydratableInstance(workInProgress); // This could've been a dehydrated suspense component.

      var suspenseState = workInProgress.memoizedState;

      if (suspenseState !== null) {
        var dehydrated = suspenseState.dehydrated;

        if (dehydrated !== null) {
          return mountDehydratedSuspenseComponent(workInProgress, dehydrated);
        }
      } // If hydration didn't succeed, fall through to the normal Suspense path.
      // To avoid a stack mismatch we need to pop the Suspense handler that we
      // pushed above. This will become less awkward when move the hydration
      // logic to its own fiber.


      popSuspenseHandler(workInProgress);
    }

    var nextPrimaryChildren = nextProps.children;
    var nextFallbackChildren = nextProps.fallback;

    if (showFallback) {
      pushFallbackTreeSuspenseHandler();
      var fallbackFragment = mountSuspenseFallbackChildren(workInProgress, nextPrimaryChildren, nextFallbackChildren, renderLanes);
      var primaryChildFragment = workInProgress.child;
      primaryChildFragment.memoizedState = mountSuspenseOffscreenState(renderLanes);
      workInProgress.memoizedState = SUSPENDED_MARKER;

      return fallbackFragment;
    } else if ( typeof nextProps.unstable_expectedLoadTime === 'number') {
      // This is a CPU-bound tree. Skip this tree and show a placeholder to
      // unblock the surrounding content. Then immediately retry after the
      // initial commit.
      pushFallbackTreeSuspenseHandler();

      var _fallbackFragment = mountSuspenseFallbackChildren(workInProgress, nextPrimaryChildren, nextFallbackChildren, renderLanes);

      var _primaryChildFragment = workInProgress.child;
      _primaryChildFragment.memoizedState = mountSuspenseOffscreenState(renderLanes);
      workInProgress.memoizedState = SUSPENDED_MARKER; // TODO: Transition Tracing is not yet implemented for CPU Suspense.
      // Since nothing actually suspended, there will nothing to ping this to
      // get it started back up to attempt the next item. While in terms of
      // priority this work has the same priority as this current render, it's
      // not part of the same transition once the transition has committed. If
      // it's sync, we still want to yield so that it can be painted.
      // Conceptually, this is really the same as pinging. We can use any
      // RetryLane even if it's the one currently rendering since we're leaving
      // it behind on this node.

      workInProgress.lanes = SomeRetryLane;
      return _fallbackFragment;
    } else {
      pushPrimaryTreeSuspenseHandler(workInProgress);
      return mountSuspensePrimaryChildren(workInProgress, nextPrimaryChildren);
    }
  } else {
    // This is an update.
    // Special path for hydration
    var prevState = current.memoizedState;

    if (prevState !== null) {
      var _dehydrated = prevState.dehydrated;

      if (_dehydrated !== null) {
        return updateDehydratedSuspenseComponent(current, workInProgress, didSuspend, nextProps, _dehydrated, prevState, renderLanes);
      }
    }

    if (showFallback) {
      pushFallbackTreeSuspenseHandler();
      var _nextFallbackChildren = nextProps.fallback;
      var _nextPrimaryChildren = nextProps.children;
      var fallbackChildFragment = updateSuspenseFallbackChildren(current, workInProgress, _nextPrimaryChildren, _nextFallbackChildren, renderLanes);
      var _primaryChildFragment2 = workInProgress.child;
      var prevOffscreenState = current.child.memoizedState;
      _primaryChildFragment2.memoizedState = prevOffscreenState === null ? mountSuspenseOffscreenState(renderLanes) : updateSuspenseOffscreenState(prevOffscreenState, renderLanes);

      _primaryChildFragment2.childLanes = getRemainingWorkInPrimaryTree(current, renderLanes);
      workInProgress.memoizedState = SUSPENDED_MARKER;
      return fallbackChildFragment;
    } else {
      pushPrimaryTreeSuspenseHandler(workInProgress);
      var _nextPrimaryChildren2 = nextProps.children;

      var _primaryChildFragment3 = updateSuspensePrimaryChildren(current, workInProgress, _nextPrimaryChildren2, renderLanes);

      workInProgress.memoizedState = null;
      return _primaryChildFragment3;
    }
  }
}

function mountSuspensePrimaryChildren(workInProgress, primaryChildren, renderLanes) {
  var mode = workInProgress.mode;
  var primaryChildProps = {
    mode: 'visible',
    children: primaryChildren
  };
  var primaryChildFragment = mountWorkInProgressOffscreenFiber(primaryChildProps, mode);
  primaryChildFragment.return = workInProgress;
  workInProgress.child = primaryChildFragment;
  return primaryChildFragment;
}

function mountSuspenseFallbackChildren(workInProgress, primaryChildren, fallbackChildren, renderLanes) {
  var mode = workInProgress.mode;
  var progressedPrimaryFragment = workInProgress.child;
  var primaryChildProps = {
    mode: 'hidden',
    children: primaryChildren
  };
  var primaryChildFragment;
  var fallbackChildFragment;

  if ((mode & ConcurrentMode) === NoMode && progressedPrimaryFragment !== null) {
    // In legacy mode, we commit the primary tree as if it successfully
    // completed, even though it's in an inconsistent state.
    primaryChildFragment = progressedPrimaryFragment;
    primaryChildFragment.childLanes = NoLanes;
    primaryChildFragment.pendingProps = primaryChildProps;

    if ( workInProgress.mode & ProfileMode) {
      // Reset the durations from the first pass so they aren't included in the
      // final amounts. This seems counterintuitive, since we're intentionally
      // not measuring part of the render phase, but this makes it match what we
      // do in Concurrent Mode.
      primaryChildFragment.actualDuration = 0;
      primaryChildFragment.actualStartTime = -1;
      primaryChildFragment.selfBaseDuration = 0;
      primaryChildFragment.treeBaseDuration = 0;
    }

    fallbackChildFragment = createFiberFromFragment(fallbackChildren, mode, renderLanes, null);
  } else {
    primaryChildFragment = mountWorkInProgressOffscreenFiber(primaryChildProps, mode);
    fallbackChildFragment = createFiberFromFragment(fallbackChildren, mode, renderLanes, null);
  }

  primaryChildFragment.return = workInProgress;
  fallbackChildFragment.return = workInProgress;
  primaryChildFragment.sibling = fallbackChildFragment;
  workInProgress.child = primaryChildFragment;
  return fallbackChildFragment;
}

function mountWorkInProgressOffscreenFiber(offscreenProps, mode, renderLanes) {
  // The props argument to `createFiberFromOffscreen` is `any` typed, so we use
  // this wrapper function to constrain it.
  return createFiberFromOffscreen(offscreenProps, mode, NoLanes, null);
}

function updateWorkInProgressOffscreenFiber(current, offscreenProps) {
  // The props argument to `createWorkInProgress` is `any` typed, so we use this
  // wrapper function to constrain it.
  return createWorkInProgress(current, offscreenProps);
}

function updateSuspensePrimaryChildren(current, workInProgress, primaryChildren, renderLanes) {
  var currentPrimaryChildFragment = current.child;
  var currentFallbackChildFragment = currentPrimaryChildFragment.sibling;
  var primaryChildFragment = updateWorkInProgressOffscreenFiber(currentPrimaryChildFragment, {
    mode: 'visible',
    children: primaryChildren
  });

  if ((workInProgress.mode & ConcurrentMode) === NoMode) {
    primaryChildFragment.lanes = renderLanes;
  }

  primaryChildFragment.return = workInProgress;
  primaryChildFragment.sibling = null;

  if (currentFallbackChildFragment !== null) {
    // Delete the fallback child fragment
    var deletions = workInProgress.deletions;

    if (deletions === null) {
      workInProgress.deletions = [currentFallbackChildFragment];
      workInProgress.flags |= ChildDeletion;
    } else {
      deletions.push(currentFallbackChildFragment);
    }
  }

  workInProgress.child = primaryChildFragment;
  return primaryChildFragment;
}

function updateSuspenseFallbackChildren(current, workInProgress, primaryChildren, fallbackChildren, renderLanes) {
  var mode = workInProgress.mode;
  var currentPrimaryChildFragment = current.child;
  var currentFallbackChildFragment = currentPrimaryChildFragment.sibling;
  var primaryChildProps = {
    mode: 'hidden',
    children: primaryChildren
  };
  var primaryChildFragment;

  if ( // In legacy mode, we commit the primary tree as if it successfully
  // completed, even though it's in an inconsistent state.
  (mode & ConcurrentMode) === NoMode && // Make sure we're on the second pass, i.e. the primary child fragment was
  // already cloned. In legacy mode, the only case where this isn't true is
  // when DevTools forces us to display a fallback; we skip the first render
  // pass entirely and go straight to rendering the fallback. (In Concurrent
  // Mode, SuspenseList can also trigger this scenario, but this is a legacy-
  // only codepath.)
  workInProgress.child !== currentPrimaryChildFragment) {
    var progressedPrimaryFragment = workInProgress.child;
    primaryChildFragment = progressedPrimaryFragment;
    primaryChildFragment.childLanes = NoLanes;
    primaryChildFragment.pendingProps = primaryChildProps;

    if ( workInProgress.mode & ProfileMode) {
      // Reset the durations from the first pass so they aren't included in the
      // final amounts. This seems counterintuitive, since we're intentionally
      // not measuring part of the render phase, but this makes it match what we
      // do in Concurrent Mode.
      primaryChildFragment.actualDuration = 0;
      primaryChildFragment.actualStartTime = -1;
      primaryChildFragment.selfBaseDuration = currentPrimaryChildFragment.selfBaseDuration;
      primaryChildFragment.treeBaseDuration = currentPrimaryChildFragment.treeBaseDuration;
    } // The fallback fiber was added as a deletion during the first pass.
    // However, since we're going to remain on the fallback, we no longer want
    // to delete it.


    workInProgress.deletions = null;
  } else {
    primaryChildFragment = updateWorkInProgressOffscreenFiber(currentPrimaryChildFragment, primaryChildProps); // Since we're reusing a current tree, we need to reuse the flags, too.
    // (We don't do this in legacy mode, because in legacy mode we don't re-use
    // the current tree; see previous branch.)

    primaryChildFragment.subtreeFlags = currentPrimaryChildFragment.subtreeFlags & StaticMask;
  }

  var fallbackChildFragment;

  if (currentFallbackChildFragment !== null) {
    fallbackChildFragment = createWorkInProgress(currentFallbackChildFragment, fallbackChildren);
  } else {
    fallbackChildFragment = createFiberFromFragment(fallbackChildren, mode, renderLanes, null); // Needs a placement effect because the parent (the Suspense boundary) already
    // mounted but this is a new fiber.

    fallbackChildFragment.flags |= Placement;
  }

  fallbackChildFragment.return = workInProgress;
  primaryChildFragment.return = workInProgress;
  primaryChildFragment.sibling = fallbackChildFragment;
  workInProgress.child = primaryChildFragment;
  return fallbackChildFragment;
}

function retrySuspenseComponentWithoutHydrating(current, workInProgress, renderLanes, recoverableError) {
  // Falling back to client rendering. Because this has performance
  // implications, it's considered a recoverable error, even though the user
  // likely won't observe anything wrong with the UI.
  //
  // The error is passed in as an argument to enforce that every caller provide
  // a custom message, or explicitly opt out (currently the only path that opts
  // out is legacy mode; every concurrent path provides an error).
  if (recoverableError !== null) {
    queueHydrationError(recoverableError);
  } // This will add the old fiber to the deletion list


  reconcileChildFibers(workInProgress, current.child, null, renderLanes); // We're now not suspended nor dehydrated.

  var nextProps = workInProgress.pendingProps;
  var primaryChildren = nextProps.children;
  var primaryChildFragment = mountSuspensePrimaryChildren(workInProgress, primaryChildren); // Needs a placement effect because the parent (the Suspense boundary) already
  // mounted but this is a new fiber.

  primaryChildFragment.flags |= Placement;
  workInProgress.memoizedState = null;
  return primaryChildFragment;
}

function mountSuspenseFallbackAfterRetryWithoutHydrating(current, workInProgress, primaryChildren, fallbackChildren, renderLanes) {
  var fiberMode = workInProgress.mode;
  var primaryChildProps = {
    mode: 'visible',
    children: primaryChildren
  };
  var primaryChildFragment = mountWorkInProgressOffscreenFiber(primaryChildProps, fiberMode);
  var fallbackChildFragment = createFiberFromFragment(fallbackChildren, fiberMode, renderLanes, null); // Needs a placement effect because the parent (the Suspense
  // boundary) already mounted but this is a new fiber.

  fallbackChildFragment.flags |= Placement;
  primaryChildFragment.return = workInProgress;
  fallbackChildFragment.return = workInProgress;
  primaryChildFragment.sibling = fallbackChildFragment;
  workInProgress.child = primaryChildFragment;

  if ((workInProgress.mode & ConcurrentMode) !== NoMode) {
    // We will have dropped the effect list which contains the
    // deletion. We need to reconcile to delete the current child.
    reconcileChildFibers(workInProgress, current.child, null, renderLanes);
  }

  return fallbackChildFragment;
}

function mountDehydratedSuspenseComponent(workInProgress, suspenseInstance, renderLanes) {
  // During the first pass, we'll bail out and not drill into the children.
  // Instead, we'll leave the content in place and try to hydrate it later.
  if ((workInProgress.mode & ConcurrentMode) === NoMode) {

    workInProgress.lanes = laneToLanes(SyncLane);
  } else if (isSuspenseInstanceFallback(suspenseInstance)) {
    // This is a client-only boundary. Since we won't get any content from the server
    // for this, we need to schedule that at a higher priority based on when it would
    // have timed out. In theory we could render it in this pass but it would have the
    // wrong priority associated with it and will prevent hydration of parent path.
    // Instead, we'll leave work left on it to render it in a separate commit.
    // TODO This time should be the time at which the server rendered response that is
    // a parent to this boundary was displayed. However, since we currently don't have
    // a protocol to transfer that time, we'll just estimate it by using the current
    // time. This will mean that Suspense timeouts are slightly shifted to later than
    // they should be.
    // Schedule a normal pri update to render this content.
    workInProgress.lanes = laneToLanes(DefaultHydrationLane);
  } else {
    // We'll continue hydrating the rest at offscreen priority since we'll already
    // be showing the right content coming from the server, it is no rush.
    workInProgress.lanes = laneToLanes(OffscreenLane);
  }

  return null;
}

function updateDehydratedSuspenseComponent(current, workInProgress, didSuspend, nextProps, suspenseInstance, suspenseState, renderLanes) {
  if (!didSuspend) {
    // This is the first render pass. Attempt to hydrate.
    pushPrimaryTreeSuspenseHandler(workInProgress); // We should never be hydrating at this point because it is the first pass,

    if ((workInProgress.mode & ConcurrentMode) === NoMode) {
      return retrySuspenseComponentWithoutHydrating(current, workInProgress, renderLanes, null);
    }

    if (isSuspenseInstanceFallback(suspenseInstance)) {
      // This boundary is in a permanent fallback state. In this case, we'll never
      // get an update and we'll never be able to hydrate the final content. Let's just try the
      // client side render instead.
      var digest, message, stack;

      {
        var _getSuspenseInstanceF2 = getSuspenseInstanceFallbackErrorDetails(suspenseInstance);

        digest = _getSuspenseInstanceF2.digest;
      }

      var error;

      if (message) {
        // eslint-disable-next-line react-internal/prod-error-codes
        error = new Error(message);
      } else {
        error = new Error('The server could not finish this Suspense boundary, likely ' + 'due to an error during server rendering. Switched to ' + 'client rendering.');
      }

      error.digest = digest;
      var capturedValue = createCapturedValue(error, digest, stack);
      return retrySuspenseComponentWithoutHydrating(current, workInProgress, renderLanes, capturedValue);
    }
    // any context has changed, we need to treat is as if the input might have changed.


    var hasContextChanged = includesSomeLane(renderLanes, current.childLanes);

    if (didReceiveUpdate || hasContextChanged) {
      // This boundary has changed since the first render. This means that we are now unable to
      // hydrate it. We might still be able to hydrate it using a higher priority lane.
      var root = getWorkInProgressRoot();

      if (root !== null) {
        var attemptHydrationAtLane = getBumpedLaneForHydration(root, renderLanes);

        if (attemptHydrationAtLane !== NoLane && attemptHydrationAtLane !== suspenseState.retryLane) {
          // Intentionally mutating since this render will get interrupted. This
          // is one of the very rare times where we mutate the current tree
          // during the render phase.
          suspenseState.retryLane = attemptHydrationAtLane; // TODO: Ideally this would inherit the event time of the current render

          var eventTime = NoTimestamp;
          enqueueConcurrentRenderForLane(current, attemptHydrationAtLane);
          scheduleUpdateOnFiber(root, current, attemptHydrationAtLane, eventTime); // Throw a special object that signals to the work loop that it should
          // interrupt the current render.
          //
          // Because we're inside a React-only execution stack, we don't
          // strictly need to throw here — we could instead modify some internal
          // work loop state. But using an exception means we don't need to
          // check for this case on every iteration of the work loop. So doing
          // it this way moves the check out of the fast path.

          throw SelectiveHydrationException;
        }
      } // If we did not selectively hydrate, we'll continue rendering without
      // hydrating. Mark this tree as suspended to prevent it from committing
      // outside a transition.
      //
      // This path should only happen if the hydration lane already suspended.
      // Currently, it also happens during sync updates because there is no
      // hydration lane for sync updates.
      // TODO: We should ideally have a sync hydration lane that we can apply to do
      // a pass where we hydrate this subtree in place using the previous Context and then
      // reapply the update afterwards.


      renderDidSuspendDelayIfPossible();
      return retrySuspenseComponentWithoutHydrating(current, workInProgress, renderLanes, null);
    } else if (isSuspenseInstancePending(suspenseInstance)) {
      // This component is still pending more data from the server, so we can't hydrate its
      // content. We treat it as if this component suspended itself. It might seem as if
      // we could just try to render it client-side instead. However, this will perform a
      // lot of unnecessary work and is unlikely to complete since it often will suspend
      // on missing data anyway. Additionally, the server might be able to render more
      // than we can on the client yet. In that case we'd end up with more fallback states
      // on the client than if we just leave it alone. If the server times out or errors
      // these should update this boundary to the permanent Fallback state instead.
      // Mark it as having captured (i.e. suspended).
      workInProgress.flags |= DidCapture; // Leave the child in place. I.e. the dehydrated fragment.

      workInProgress.child = current.child; // Register a callback to retry this boundary once the server has sent the result.

      var retry = retryDehydratedSuspenseBoundary.bind(null, current);
      registerSuspenseInstanceRetry(suspenseInstance, retry);
      return null;
    } else {
      // This is the first attempt.
      reenterHydrationStateFromDehydratedSuspenseInstance(workInProgress, suspenseInstance, suspenseState.treeContext);
      var primaryChildren = nextProps.children;
      var primaryChildFragment = mountSuspensePrimaryChildren(workInProgress, primaryChildren); // Mark the children as hydrating. This is a fast path to know whether this
      // tree is part of a hydrating tree. This is used to determine if a child
      // node has fully mounted yet, and for scheduling event replaying.
      // Conceptually this is similar to Placement in that a new subtree is
      // inserted into the React tree here. It just happens to not need DOM
      // mutations because it already exists.

      primaryChildFragment.flags |= Hydrating;
      return primaryChildFragment;
    }
  } else {
    // This is the second render pass. We already attempted to hydrated, but
    // something either suspended or errored.
    if (workInProgress.flags & ForceClientRender) {
      // Something errored during hydration. Try again without hydrating.
      pushPrimaryTreeSuspenseHandler(workInProgress);
      workInProgress.flags &= ~ForceClientRender;

      var _capturedValue = createCapturedValue(new Error('There was an error while hydrating this Suspense boundary. ' + 'Switched to client rendering.'));

      return retrySuspenseComponentWithoutHydrating(current, workInProgress, renderLanes, _capturedValue);
    } else if (workInProgress.memoizedState !== null) {
      // Something suspended and we should still be in dehydrated mode.
      // Leave the existing child in place.
      // Push to avoid a mismatch
      pushFallbackTreeSuspenseHandler();
      workInProgress.child = current.child; // The dehydrated completion pass expects this flag to be there
      // but the normal suspense pass doesn't.

      workInProgress.flags |= DidCapture;
      return null;
    } else {
      // Suspended but we should no longer be in dehydrated mode.
      // Therefore we now have to render the fallback.
      pushFallbackTreeSuspenseHandler();
      var nextPrimaryChildren = nextProps.children;
      var nextFallbackChildren = nextProps.fallback;
      var fallbackChildFragment = mountSuspenseFallbackAfterRetryWithoutHydrating(current, workInProgress, nextPrimaryChildren, nextFallbackChildren, renderLanes);
      var _primaryChildFragment4 = workInProgress.child;
      _primaryChildFragment4.memoizedState = mountSuspenseOffscreenState(renderLanes);
      workInProgress.memoizedState = SUSPENDED_MARKER;
      return fallbackChildFragment;
    }
  }
}

function scheduleSuspenseWorkOnFiber(fiber, renderLanes, propagationRoot) {
  fiber.lanes = mergeLanes(fiber.lanes, renderLanes);
  var alternate = fiber.alternate;

  if (alternate !== null) {
    alternate.lanes = mergeLanes(alternate.lanes, renderLanes);
  }

  scheduleContextWorkOnParentPath(fiber.return, renderLanes, propagationRoot);
}

function propagateSuspenseContextChange(workInProgress, firstChild, renderLanes) {
  // Mark any Suspense boundaries with fallbacks as having work to do.
  // If they were previously forced into fallbacks, they may now be able
  // to unblock.
  var node = firstChild;

  while (node !== null) {
    if (node.tag === SuspenseComponent) {
      var state = node.memoizedState;

      if (state !== null) {
        scheduleSuspenseWorkOnFiber(node, renderLanes, workInProgress);
      }
    } else if (node.tag === SuspenseListComponent) {
      // If the tail is hidden there might not be an Suspense boundaries
      // to schedule work on. In this case we have to schedule it on the
      // list itself.
      // We don't have to traverse to the children of the list since
      // the list will propagate the change when it rerenders.
      scheduleSuspenseWorkOnFiber(node, renderLanes, workInProgress);
    } else if (node.child !== null) {
      node.child.return = node;
      node = node.child;
      continue;
    }

    if (node === workInProgress) {
      return;
    } // $FlowFixMe[incompatible-use] found when upgrading Flow


    while (node.sibling === null) {
      // $FlowFixMe[incompatible-use] found when upgrading Flow
      if (node.return === null || node.return === workInProgress) {
        return;
      }

      node = node.return;
    } // $FlowFixMe[incompatible-use] found when upgrading Flow


    node.sibling.return = node.return;
    node = node.sibling;
  }
}

function findLastContentRow(firstChild) {
  // This is going to find the last row among these children that is already
  // showing content on the screen, as opposed to being in fallback state or
  // new. If a row has multiple Suspense boundaries, any of them being in the
  // fallback state, counts as the whole row being in a fallback state.
  // Note that the "rows" will be workInProgress, but any nested children
  // will still be current since we haven't rendered them yet. The mounted
  // order may not be the same as the new order. We use the new order.
  var row = firstChild;
  var lastContentRow = null;

  while (row !== null) {
    var currentRow = row.alternate; // New rows can't be content rows.

    if (currentRow !== null && findFirstSuspended(currentRow) === null) {
      lastContentRow = row;
    }

    row = row.sibling;
  }

  return lastContentRow;
}

function initSuspenseListRenderState(workInProgress, isBackwards, tail, lastContentRow, tailMode) {
  var renderState = workInProgress.memoizedState;

  if (renderState === null) {
    workInProgress.memoizedState = {
      isBackwards: isBackwards,
      rendering: null,
      renderingStartTime: 0,
      last: lastContentRow,
      tail: tail,
      tailMode: tailMode
    };
  } else {
    // We can reuse the existing object from previous renders.
    renderState.isBackwards = isBackwards;
    renderState.rendering = null;
    renderState.renderingStartTime = 0;
    renderState.last = lastContentRow;
    renderState.tail = tail;
    renderState.tailMode = tailMode;
  }
} // This can end up rendering this component multiple passes.
// The first pass splits the children fibers into two sets. A head and tail.
// We first render the head. If anything is in fallback state, we do another
// pass through beginWork to rerender all children (including the tail) with
// the force suspend context. If the first render didn't have anything in
// in fallback state. Then we render each row in the tail one-by-one.
// That happens in the completeWork phase without going back to beginWork.


function updateSuspenseListComponent(current, workInProgress, renderLanes) {
  var nextProps = workInProgress.pendingProps;
  var revealOrder = nextProps.revealOrder;
  var tailMode = nextProps.tail;
  var newChildren = nextProps.children;
  reconcileChildren(current, workInProgress, newChildren, renderLanes);
  var suspenseContext = suspenseStackCursor.current;
  var shouldForceFallback = hasSuspenseListContext(suspenseContext, ForceSuspenseFallback);

  if (shouldForceFallback) {
    suspenseContext = setShallowSuspenseListContext(suspenseContext, ForceSuspenseFallback);
    workInProgress.flags |= DidCapture;
  } else {
    var didSuspendBefore = current !== null && (current.flags & DidCapture) !== NoFlags;

    if (didSuspendBefore) {
      // If we previously forced a fallback, we need to schedule work
      // on any nested boundaries to let them know to try to render
      // again. This is the same as context updating.
      propagateSuspenseContextChange(workInProgress, workInProgress.child, renderLanes);
    }

    suspenseContext = setDefaultShallowSuspenseListContext(suspenseContext);
  }

  pushSuspenseListContext(workInProgress, suspenseContext);

  if ((workInProgress.mode & ConcurrentMode) === NoMode) {
    // In legacy mode, SuspenseList doesn't work so we just
    // use make it a noop by treating it as the default revealOrder.
    workInProgress.memoizedState = null;
  } else {
    switch (revealOrder) {
      case 'forwards':
        {
          var lastContentRow = findLastContentRow(workInProgress.child);
          var tail;

          if (lastContentRow === null) {
            // The whole list is part of the tail.
            // TODO: We could fast path by just rendering the tail now.
            tail = workInProgress.child;
            workInProgress.child = null;
          } else {
            // Disconnect the tail rows after the content row.
            // We're going to render them separately later.
            tail = lastContentRow.sibling;
            lastContentRow.sibling = null;
          }

          initSuspenseListRenderState(workInProgress, false, // isBackwards
          tail, lastContentRow, tailMode);
          break;
        }

      case 'backwards':
        {
          // We're going to find the first row that has existing content.
          // At the same time we're going to reverse the list of everything
          // we pass in the meantime. That's going to be our tail in reverse
          // order.
          var _tail = null;
          var row = workInProgress.child;
          workInProgress.child = null;

          while (row !== null) {
            var currentRow = row.alternate; // New rows can't be content rows.

            if (currentRow !== null && findFirstSuspended(currentRow) === null) {
              // This is the beginning of the main content.
              workInProgress.child = row;
              break;
            }

            var nextRow = row.sibling;
            row.sibling = _tail;
            _tail = row;
            row = nextRow;
          } // TODO: If workInProgress.child is null, we can continue on the tail immediately.


          initSuspenseListRenderState(workInProgress, true, // isBackwards
          _tail, null, // last
          tailMode);
          break;
        }

      case 'together':
        {
          initSuspenseListRenderState(workInProgress, false, // isBackwards
          null, // tail
          null, // last
          undefined);
          break;
        }

      default:
        {
          // The default reveal order is the same as not having
          // a boundary.
          workInProgress.memoizedState = null;
        }
    }
  }

  return workInProgress.child;
}

function updatePortalComponent(current, workInProgress, renderLanes) {
  pushHostContainer(workInProgress, workInProgress.stateNode.containerInfo);
  var nextChildren = workInProgress.pendingProps;

  if (current === null) {
    // Portals are special because we don't append the children during mount
    // but at commit. Therefore we need to track insertions which the normal
    // flow doesn't do during mount. This doesn't happen at the root because
    // the root always starts with a "current" with a null child.
    // TODO: Consider unifying this with how the root works.
    workInProgress.child = reconcileChildFibers(workInProgress, null, nextChildren, renderLanes);
  } else {
    reconcileChildren(current, workInProgress, nextChildren, renderLanes);
  }

  return workInProgress.child;
}

function updateContextProvider(current, workInProgress, renderLanes) {
  var providerType = workInProgress.type;
  var context = providerType._context;
  var newProps = workInProgress.pendingProps;
  var oldProps = workInProgress.memoizedProps;
  var newValue = newProps.value;

  pushProvider(workInProgress, context, newValue);

  {
    if (oldProps !== null) {
      var oldValue = oldProps.value;

      if (objectIs(oldValue, newValue)) {
        // No change. Bailout early if children are the same.
        if (oldProps.children === newProps.children && !hasContextChanged()) {
          return bailoutOnAlreadyFinishedWork(current, workInProgress, renderLanes);
        }
      } else {
        // The context value changed. Search for matching consumers and schedule
        // them to update.
        propagateContextChange(workInProgress, context, renderLanes);
      }
    }
  }

  var newChildren = newProps.children;
  reconcileChildren(current, workInProgress, newChildren, renderLanes);
  return workInProgress.child;
}

function updateContextConsumer(current, workInProgress, renderLanes) {
  var context = workInProgress.type; // The logic below for Context differs depending on PROD or DEV mode. In

  var newProps = workInProgress.pendingProps;
  var render = newProps.children;

  prepareToReadContext(workInProgress, renderLanes);
  var newValue = readContext(context);

  {
    markComponentRenderStarted(workInProgress);
  }

  var newChildren;

  {
    newChildren = render(newValue);
  }

  {
    markComponentRenderStopped();
  } // React DevTools reads this flag.


  workInProgress.flags |= PerformedWork;
  reconcileChildren(current, workInProgress, newChildren, renderLanes);
  return workInProgress.child;
}

function markWorkInProgressReceivedUpdate() {
  didReceiveUpdate = true;
}

function resetSuspendedCurrentOnMountInLegacyMode(current, workInProgress) {
  if ((workInProgress.mode & ConcurrentMode) === NoMode) {
    if (current !== null) {
      // A lazy component only mounts if it suspended inside a non-
      // concurrent tree, in an inconsistent state. We want to treat it like
      // a new mount, even though an empty version of it already committed.
      // Disconnect the alternate pointers.
      current.alternate = null;
      workInProgress.alternate = null; // Since this is conceptually a new fiber, schedule a Placement effect

      workInProgress.flags |= Placement;
    }
  }
}

function bailoutOnAlreadyFinishedWork(current, workInProgress, renderLanes) {
  if (current !== null) {
    // Reuse previous dependencies
    workInProgress.dependencies = current.dependencies;
  }

  {
    // Don't update "base" render times for bailouts.
    stopProfilerTimerIfRunning();
  }

  markSkippedUpdateLanes(workInProgress.lanes); // Check if the children have any pending work.

  if (!includesSomeLane(renderLanes, workInProgress.childLanes)) {
    // The children don't have any work either. We can skip them.
    // TODO: Once we add back resuming, we should check if the children are
    // a work-in-progress set. If so, we need to transfer their effects.
    {
      return null;
    }
  } // This fiber doesn't have work, but its subtree does. Clone the child
  // fibers and continue.


  cloneChildFibers(current, workInProgress);
  return workInProgress.child;
}

function checkScheduledUpdateOrContext(current, renderLanes) {
  // Before performing an early bailout, we must check if there are pending
  // updates or context.
  var updateLanes = current.lanes;

  if (includesSomeLane(updateLanes, renderLanes)) {
    return true;
  } // No pending update, but because context is propagated lazily, we need

  return false;
}

function attemptEarlyBailoutIfNoScheduledUpdate(current, workInProgress, renderLanes) {
  // This fiber does not have any pending work. Bailout without entering
  // the begin phase. There's still some bookkeeping we that needs to be done
  // in this optimized path, mostly pushing stuff onto the stack.
  switch (workInProgress.tag) {
    case HostRoot:
      pushHostRootContext(workInProgress);
      var root = workInProgress.stateNode;

      {
        var cache = current.memoizedState.cache;
        pushCacheProvider(workInProgress, cache);
      }

      resetHydrationState();
      break;

    case HostResource:
    case HostSingleton:
    case HostComponent:
      pushHostContext(workInProgress);
      break;

    case ClassComponent:
      {
        var Component = workInProgress.type;

        if (isContextProvider(Component)) {
          pushContextProvider(workInProgress);
        }

        break;
      }

    case HostPortal:
      pushHostContainer(workInProgress, workInProgress.stateNode.containerInfo);
      break;

    case ContextProvider:
      {
        var newValue = workInProgress.memoizedProps.value;
        var context = workInProgress.type._context;
        pushProvider(workInProgress, context, newValue);
        break;
      }

    case Profiler:
      {
        // Profiler should only call onRender when one of its descendants actually rendered.
        var hasChildWork = includesSomeLane(renderLanes, workInProgress.childLanes);

        if (hasChildWork) {
          workInProgress.flags |= Update;
        }

        {
          // Reset effect durations for the next eventual effect phase.
          // These are reset during render to allow the DevTools commit hook a chance to read them,
          var stateNode = workInProgress.stateNode;
          stateNode.effectDuration = 0;
          stateNode.passiveEffectDuration = 0;
        }
      }

      break;

    case SuspenseComponent:
      {
        var state = workInProgress.memoizedState;

        if (state !== null) {
          if (state.dehydrated !== null) {
            // We're not going to render the children, so this is just to maintain
            // push/pop symmetry
            pushPrimaryTreeSuspenseHandler(workInProgress); // We know that this component will suspend again because if it has
            // been unsuspended it has committed as a resolved Suspense component.
            // If it needs to be retried, it should have work scheduled on it.

            workInProgress.flags |= DidCapture; // We should never render the children of a dehydrated boundary until we
            // upgrade it. We return null instead of bailoutOnAlreadyFinishedWork.

            return null;
          } // If this boundary is currently timed out, we need to decide
          // whether to retry the primary children, or to skip over it and
          // go straight to the fallback. Check the priority of the primary
          // child fragment.


          var primaryChildFragment = workInProgress.child;
          var primaryChildLanes = primaryChildFragment.childLanes;

          if (includesSomeLane(renderLanes, primaryChildLanes)) {
            // The primary children have pending work. Use the normal path
            // to attempt to render the primary children again.
            return updateSuspenseComponent(current, workInProgress, renderLanes);
          } else {
            // The primary child fragment does not have pending work marked
            // on it
            pushPrimaryTreeSuspenseHandler(workInProgress); // The primary children do not have pending work with sufficient
            // priority. Bailout.

            var child = bailoutOnAlreadyFinishedWork(current, workInProgress, renderLanes);

            if (child !== null) {
              // The fallback children have pending work. Skip over the
              // primary children and work on the fallback.
              return child.sibling;
            } else {
              // Note: We can return `null` here because we already checked
              // whether there were nested context consumers, via the call to
              // `bailoutOnAlreadyFinishedWork` above.
              return null;
            }
          }
        } else {
          pushPrimaryTreeSuspenseHandler(workInProgress);
        }

        break;
      }

    case SuspenseListComponent:
      {
        var didSuspendBefore = (current.flags & DidCapture) !== NoFlags;

        var _hasChildWork = includesSomeLane(renderLanes, workInProgress.childLanes);

        if (didSuspendBefore) {
          if (_hasChildWork) {
            // If something was in fallback state last time, and we have all the
            // same children then we're still in progressive loading state.
            // Something might get unblocked by state updates or retries in the
            // tree which will affect the tail. So we need to use the normal
            // path to compute the correct tail.
            return updateSuspenseListComponent(current, workInProgress, renderLanes);
          } // If none of the children had any work, that means that none of
          // them got retried so they'll still be blocked in the same way
          // as before. We can fast bail out.


          workInProgress.flags |= DidCapture;
        } // If nothing suspended before and we're rendering the same children,
        // then the tail doesn't matter. Anything new that suspends will work
        // in the "together" mode, so we can continue from the state we had.


        var renderState = workInProgress.memoizedState;

        if (renderState !== null) {
          // Reset to the "together" mode in case we've started a different
          // update in the past but didn't complete it.
          renderState.rendering = null;
          renderState.tail = null;
          renderState.lastEffect = null;
        }

        pushSuspenseListContext(workInProgress, suspenseStackCursor.current);

        if (_hasChildWork) {
          break;
        } else {
          // If none of the children had any work, that means that none of
          // them got retried so they'll still be blocked in the same way
          // as before. We can fast bail out.
          return null;
        }
      }

    case OffscreenComponent:
    case LegacyHiddenComponent:
      {
        // Need to check if the tree still needs to be deferred. This is
        // almost identical to the logic used in the normal update path,
        // so we'll just enter that. The only difference is we'll bail out
        // at the next level instead of this one, because the child props
        // have not changed. Which is fine.
        // TODO: Probably should refactor `beginWork` to split the bailout
        // path from the normal path. I'm tempted to do a labeled break here
        // but I won't :)
        workInProgress.lanes = NoLanes;
        return updateOffscreenComponent(current, workInProgress, renderLanes);
      }

    case CacheComponent:
      {
        {
          var _cache = current.memoizedState.cache;
          pushCacheProvider(workInProgress, _cache);
        }

        break;
      }
  }

  return bailoutOnAlreadyFinishedWork(current, workInProgress, renderLanes);
}

function beginWork(current, workInProgress, renderLanes) {

  if (current !== null) {
    var oldProps = current.memoizedProps;
    var newProps = workInProgress.pendingProps;

    if (oldProps !== newProps || hasContextChanged() || ( // Force a re-render if the implementation changed due to hot reload:
     false)) {
      // If props or context changed, mark the fiber as having performed work.
      // This may be unset if the props are determined to be equal later (memo).
      didReceiveUpdate = true;
    } else {
      // Neither props nor legacy context changes. Check if there's a pending
      // update or context change.
      var hasScheduledUpdateOrContext = checkScheduledUpdateOrContext(current, renderLanes);

      if (!hasScheduledUpdateOrContext && // If this is the second pass of an error or suspense boundary, there
      // may not be work scheduled on `current`, so we check for this flag.
      (workInProgress.flags & DidCapture) === NoFlags) {
        // No pending updates or context. Bail out now.
        didReceiveUpdate = false;
        return attemptEarlyBailoutIfNoScheduledUpdate(current, workInProgress, renderLanes);
      }

      if ((current.flags & ForceUpdateForLegacySuspense) !== NoFlags) {
        // This is a special case that only exists for legacy mode.
        // See https://github.com/facebook/react/pull/19216.
        didReceiveUpdate = true;
      } else {
        // An update was scheduled on this fiber, but there are no new props
        // nor legacy context. Set this to false. If an update queue or context
        // consumer produces a changed value, it will set this to true. Otherwise,
        // the component will assume the children have not changed and bail out.
        didReceiveUpdate = false;
      }
    }
  } else {
    didReceiveUpdate = false;

    if (getIsHydrating() && isForkedChild(workInProgress)) {
      // Check if this child belongs to a list of muliple children in
      // its parent.
      //
      // In a true multi-threaded implementation, we would render children on
      // parallel threads. This would represent the beginning of a new render
      // thread for this subtree.
      //
      // We only use this for id generation during hydration, which is why the
      // logic is located in this special branch.
      var slotIndex = workInProgress.index;
      var numberOfForks = getForksAtLevel();
      pushTreeId(workInProgress, numberOfForks, slotIndex);
    }
  } // Before entering the begin phase, clear pending update priority.
  // TODO: This assumes that we're about to evaluate the component and process
  // the update queue. However, there's an exception: SimpleMemoComponent
  // sometimes bails out later in the begin phase. This indicates that we should
  // move this assignment out of the common path and into each branch.


  workInProgress.lanes = NoLanes;

  switch (workInProgress.tag) {
    case IndeterminateComponent:
      {
        return mountIndeterminateComponent(current, workInProgress, workInProgress.type, renderLanes);
      }

    case LazyComponent:
      {
        var elementType = workInProgress.elementType;
        return mountLazyComponent(current, workInProgress, elementType, renderLanes);
      }

    case FunctionComponent:
      {
        var Component = workInProgress.type;
        var unresolvedProps = workInProgress.pendingProps;
        var resolvedProps = workInProgress.elementType === Component ? unresolvedProps : resolveDefaultProps(Component, unresolvedProps);
        return updateFunctionComponent(current, workInProgress, Component, resolvedProps, renderLanes);
      }

    case ClassComponent:
      {
        var _Component = workInProgress.type;
        var _unresolvedProps = workInProgress.pendingProps;

        var _resolvedProps = workInProgress.elementType === _Component ? _unresolvedProps : resolveDefaultProps(_Component, _unresolvedProps);

        return updateClassComponent(current, workInProgress, _Component, _resolvedProps, renderLanes);
      }

    case HostRoot:
      return updateHostRoot(current, workInProgress, renderLanes);

    case HostResource:
      if ( supportsResources) {
        return updateHostResource(current, workInProgress);
      }

    // eslint-disable-next-line no-fallthrough

    case HostSingleton:
      if ( supportsSingletons) {
        return updateHostSingleton(current, workInProgress, renderLanes);
      }

    // eslint-disable-next-line no-fallthrough

    case HostComponent:
      return updateHostComponent(current, workInProgress, renderLanes);

    case HostText:
      return updateHostText(current, workInProgress);

    case SuspenseComponent:
      return updateSuspenseComponent(current, workInProgress, renderLanes);

    case HostPortal:
      return updatePortalComponent(current, workInProgress, renderLanes);

    case ForwardRef:
      {
        var type = workInProgress.type;
        var _unresolvedProps2 = workInProgress.pendingProps;

        var _resolvedProps2 = workInProgress.elementType === type ? _unresolvedProps2 : resolveDefaultProps(type, _unresolvedProps2);

        return updateForwardRef(current, workInProgress, type, _resolvedProps2, renderLanes);
      }

    case Fragment:
      return updateFragment(current, workInProgress, renderLanes);

    case Mode:
      return updateMode(current, workInProgress, renderLanes);

    case Profiler:
      return updateProfiler(current, workInProgress, renderLanes);

    case ContextProvider:
      return updateContextProvider(current, workInProgress, renderLanes);

    case ContextConsumer:
      return updateContextConsumer(current, workInProgress, renderLanes);

    case MemoComponent:
      {
        var _type2 = workInProgress.type;
        var _unresolvedProps3 = workInProgress.pendingProps; // Resolve outer props first, then resolve inner props.

        var _resolvedProps3 = resolveDefaultProps(_type2, _unresolvedProps3);

        _resolvedProps3 = resolveDefaultProps(_type2.type, _resolvedProps3);
        return updateMemoComponent(current, workInProgress, _type2, _resolvedProps3, renderLanes);
      }

    case SimpleMemoComponent:
      {
        return updateSimpleMemoComponent(current, workInProgress, workInProgress.type, workInProgress.pendingProps, renderLanes);
      }

    case IncompleteClassComponent:
      {
        var _Component2 = workInProgress.type;
        var _unresolvedProps4 = workInProgress.pendingProps;

        var _resolvedProps4 = workInProgress.elementType === _Component2 ? _unresolvedProps4 : resolveDefaultProps(_Component2, _unresolvedProps4);

        return mountIncompleteClassComponent(current, workInProgress, _Component2, _resolvedProps4, renderLanes);
      }

    case SuspenseListComponent:
      {
        return updateSuspenseListComponent(current, workInProgress, renderLanes);
      }

    case ScopeComponent:
      {

        break;
      }

    case OffscreenComponent:
      {
        return updateOffscreenComponent(current, workInProgress, renderLanes);
      }

    case LegacyHiddenComponent:
      {

        break;
      }

    case CacheComponent:
      {
        {
          return updateCacheComponent(current, workInProgress, renderLanes);
        }
      }
  }

  throw new Error("Unknown unit of work tag (" + workInProgress.tag + "). This error is likely caused by a bug in " + 'React. Please file an issue.');
}

var valueCursor = createCursor(null);

var currentlyRenderingFiber$1 = null;
var lastContextDependency = null;
var lastFullyObservedContext = null;
function resetContextDependencies() {
  // This is called right before React yields execution, to ensure `readContext`
  // cannot be called outside the render phase.
  currentlyRenderingFiber$1 = null;
  lastContextDependency = null;
  lastFullyObservedContext = null;
}
function pushProvider(providerFiber, context, nextValue) {
  if (isPrimaryRenderer) {
    push(valueCursor, context._currentValue);
    context._currentValue = nextValue;
  } else {
    push(valueCursor, context._currentValue2);
    context._currentValue2 = nextValue;
  }
}
function popProvider(context, providerFiber) {
  var currentValue = valueCursor.current;
  pop(valueCursor);

  if (isPrimaryRenderer) {
    if ( currentValue === REACT_SERVER_CONTEXT_DEFAULT_VALUE_NOT_LOADED) {
      context._currentValue = context._defaultValue;
    } else {
      context._currentValue = currentValue;
    }
  } else {
    if ( currentValue === REACT_SERVER_CONTEXT_DEFAULT_VALUE_NOT_LOADED) {
      context._currentValue2 = context._defaultValue;
    } else {
      context._currentValue2 = currentValue;
    }
  }
}
function scheduleContextWorkOnParentPath(parent, renderLanes, propagationRoot) {
  // Update the child lanes of all the ancestors, including the alternates.
  var node = parent;

  while (node !== null) {
    var alternate = node.alternate;

    if (!isSubsetOfLanes(node.childLanes, renderLanes)) {
      node.childLanes = mergeLanes(node.childLanes, renderLanes);

      if (alternate !== null) {
        alternate.childLanes = mergeLanes(alternate.childLanes, renderLanes);
      }
    } else if (alternate !== null && !isSubsetOfLanes(alternate.childLanes, renderLanes)) {
      alternate.childLanes = mergeLanes(alternate.childLanes, renderLanes);
    }

    if (node === propagationRoot) {
      break;
    }

    node = node.return;
  }
}
function propagateContextChange(workInProgress, context, renderLanes) {
  {
    propagateContextChange_eager(workInProgress, context, renderLanes);
  }
}

function propagateContextChange_eager(workInProgress, context, renderLanes) {

  var fiber = workInProgress.child;

  if (fiber !== null) {
    // Set the return pointer of the child to the work-in-progress fiber.
    fiber.return = workInProgress;
  }

  while (fiber !== null) {
    var nextFiber = void 0; // Visit this fiber.

    var list = fiber.dependencies;

    if (list !== null) {
      nextFiber = fiber.child;
      var dependency = list.firstContext;

      while (dependency !== null) {
        // Check if the context matches.
        if (dependency.context === context) {
          // Match! Schedule an update on this fiber.
          if (fiber.tag === ClassComponent) {
            // Schedule a force update on the work-in-progress.
            var lane = pickArbitraryLane(renderLanes);
            var update = createUpdate(NoTimestamp, lane);
            update.tag = ForceUpdate; // TODO: Because we don't have a work-in-progress, this will add the
            // update to the current fiber, too, which means it will persist even if
            // this render is thrown away. Since it's a race condition, not sure it's
            // worth fixing.
            // Inlined `enqueueUpdate` to remove interleaved update check

            var updateQueue = fiber.updateQueue;

            if (updateQueue === null) ; else {
              var sharedQueue = updateQueue.shared;
              var pending = sharedQueue.pending;

              if (pending === null) {
                // This is the first update. Create a circular list.
                update.next = update;
              } else {
                update.next = pending.next;
                pending.next = update;
              }

              sharedQueue.pending = update;
            }
          }

          fiber.lanes = mergeLanes(fiber.lanes, renderLanes);
          var alternate = fiber.alternate;

          if (alternate !== null) {
            alternate.lanes = mergeLanes(alternate.lanes, renderLanes);
          }

          scheduleContextWorkOnParentPath(fiber.return, renderLanes, workInProgress); // Mark the updated lanes on the list, too.

          list.lanes = mergeLanes(list.lanes, renderLanes); // Since we already found a match, we can stop traversing the
          // dependency list.

          break;
        }

        dependency = dependency.next;
      }
    } else if (fiber.tag === ContextProvider) {
      // Don't scan deeper if this is a matching provider
      nextFiber = fiber.type === workInProgress.type ? null : fiber.child;
    } else if (fiber.tag === DehydratedFragment) {
      // If a dehydrated suspense boundary is in this subtree, we don't know
      // if it will have any context consumers in it. The best we can do is
      // mark it as having updates.
      var parentSuspense = fiber.return;

      if (parentSuspense === null) {
        throw new Error('We just came from a parent so we must have had a parent. This is a bug in React.');
      }

      parentSuspense.lanes = mergeLanes(parentSuspense.lanes, renderLanes);
      var _alternate = parentSuspense.alternate;

      if (_alternate !== null) {
        _alternate.lanes = mergeLanes(_alternate.lanes, renderLanes);
      } // This is intentionally passing this fiber as the parent
      // because we want to schedule this fiber as having work
      // on its children. We'll use the childLanes on
      // this fiber to indicate that a context has changed.


      scheduleContextWorkOnParentPath(parentSuspense, renderLanes, workInProgress);
      nextFiber = fiber.sibling;
    } else {
      // Traverse down.
      nextFiber = fiber.child;
    }

    if (nextFiber !== null) {
      // Set the return pointer of the child to the work-in-progress fiber.
      nextFiber.return = fiber;
    } else {
      // No child. Traverse to next sibling.
      nextFiber = fiber;

      while (nextFiber !== null) {
        if (nextFiber === workInProgress) {
          // We're back to the root of this subtree. Exit.
          nextFiber = null;
          break;
        }

        var sibling = nextFiber.sibling;

        if (sibling !== null) {
          // Set the return pointer of the sibling to the work-in-progress fiber.
          sibling.return = nextFiber.return;
          nextFiber = sibling;
          break;
        } // No more siblings. Traverse up.


        nextFiber = nextFiber.return;
      }
    }

    fiber = nextFiber;
  }
}
function prepareToReadContext(workInProgress, renderLanes) {
  currentlyRenderingFiber$1 = workInProgress;
  lastContextDependency = null;
  lastFullyObservedContext = null;
  var dependencies = workInProgress.dependencies;

  if (dependencies !== null) {
    {
      var firstContext = dependencies.firstContext;

      if (firstContext !== null) {
        if (includesSomeLane(dependencies.lanes, renderLanes)) {
          // Context list has a pending update. Mark that this fiber performed work.
          markWorkInProgressReceivedUpdate();
        } // Reset the work-in-progress list


        dependencies.firstContext = null;
      }
    }
  }
}
function readContext(context) {

  var value = isPrimaryRenderer ? context._currentValue : context._currentValue2;

  if (lastFullyObservedContext === context) ; else {
    var contextItem = {
      context: context,
      memoizedValue: value,
      next: null
    };

    if (lastContextDependency === null) {
      if (currentlyRenderingFiber$1 === null) {
        throw new Error('Context can only be read while React is rendering. ' + 'In classes, you can read it in the render method or getDerivedStateFromProps. ' + 'In function components, you can read it directly in the function body, but not ' + 'inside Hooks like useReducer() or useMemo().');
      } // This is the first dependency for this component. Create a new list.


      lastContextDependency = contextItem;
      currentlyRenderingFiber$1.dependencies = {
        lanes: NoLanes,
        firstContext: contextItem
      };
    } else {
      // Append a new context item.
      lastContextDependency = lastContextDependency.next = contextItem;
    }
  }

  return value;
}

// replace it with a lightweight shim that only has the features we use.

var AbortControllerLocal =  typeof AbortController !== 'undefined' ? AbortController : function AbortControllerShim() {
  var listeners = [];
  var signal = this.signal = {
    aborted: false,
    addEventListener: function (type, listener) {
      listeners.push(listener);
    }
  };

  this.abort = function () {
    signal.aborted = true;
    listeners.forEach(function (listener) {
      return listener();
    });
  };
} ; // Intentionally not named imports because Rollup would
// use dynamic dispatch for CommonJS interop named imports.

var scheduleCallback$1 = Scheduler.unstable_scheduleCallback,
    NormalPriority$1 = Scheduler.unstable_NormalPriority;
var CacheContext =  {
  $$typeof: REACT_CONTEXT_TYPE,
  // We don't use Consumer/Provider for Cache components. So we'll cheat.
  Consumer: null,
  Provider: null,
  // We'll initialize these at the root.
  _currentValue: null,
  _currentValue2: null,
  _threadCount: 0,
  _defaultValue: null,
  _globalName: null
} ;
// for retaining the cache once it is in use (retainCache), and releasing the cache
// once it is no longer needed (releaseCache).


function createCache() {

  var cache = {
    controller: new AbortControllerLocal(),
    data: new Map(),
    refCount: 0
  };
  return cache;
}
function retainCache(cache) {

  cache.refCount++;
} // Cleanup a cache instance, potentially freeing it if there are no more references

function releaseCache(cache) {

  cache.refCount--;

  if (cache.refCount === 0) {
    scheduleCallback$1(NormalPriority$1, function () {
      cache.controller.abort();
    });
  }
}
function pushCacheProvider(workInProgress, cache) {

  pushProvider(workInProgress, CacheContext, cache);
}
function popCacheProvider(workInProgress, cache) {

  popProvider(CacheContext);
}

var ReactCurrentBatchConfig$1 = ReactSharedInternals.ReactCurrentBatchConfig;
var NoTransition = null;
function requestCurrentTransition() {
  return ReactCurrentBatchConfig$1.transition;
} // When retrying a Suspense/Offscreen boundary, we restore the cache that was
// used during the previous render by placing it here, on the stack.

var resumedCache = createCursor(null); // During the render/synchronous commit phase, we don't actually process the

function peekCacheFromPool() {
  // If we're rendering inside a Suspense boundary that is currently hidden,
  // we should use the same cache that we used during the previous render, if
  // one exists.


  var cacheResumedFromPreviousRender = resumedCache.current;

  if (cacheResumedFromPreviousRender !== null) {
    return cacheResumedFromPreviousRender;
  } // Otherwise, check the root's cache pool.


  var root = getWorkInProgressRoot();
  var cacheFromRootCachePool = root.pooledCache;
  return cacheFromRootCachePool;
}

function requestCacheFromPool(renderLanes) {
  // Similar to previous function, except if there's not already a cache in the
  // pool, we allocate a new one.
  var cacheFromPool = peekCacheFromPool();

  if (cacheFromPool !== null) {
    return cacheFromPool;
  } // Create a fresh cache and add it to the root cache pool. A cache can have
  // multiple owners:
  // - A cache pool that lives on the FiberRoot. This is where all fresh caches
  //   are originally created (TODO: except during refreshes, until we implement
  //   this correctly). The root takes ownership immediately when the cache is
  //   created. Conceptually, root.pooledCache is an Option<Arc<Cache>> (owned),
  //   and the return value of this function is a &Arc<Cache> (borrowed).
  // - One of several fiber types: host root, cache boundary, suspense
  //   component. These retain and release in the commit phase.


  var root = getWorkInProgressRoot();
  var freshCache = createCache();
  root.pooledCache = freshCache;
  retainCache(freshCache);

  if (freshCache !== null) {
    root.pooledCacheLanes |= renderLanes;
  }

  return freshCache;
}
function pushTransition(offscreenWorkInProgress, prevCachePool, newTransitions) {
  {
    if (prevCachePool === null) {
      push(resumedCache, resumedCache.current);
    } else {
      push(resumedCache, prevCachePool.pool);
    }
  }
}
function popTransition(workInProgress, current) {
  if (current !== null) {

    {
      pop(resumedCache);
    }
  }
}
function getSuspendedCache() {
  // cache that would have been used to render fresh data during this render,
  // if there was any, so that we can resume rendering with the same cache when
  // we receive more data.


  var cacheFromPool = peekCacheFromPool();

  if (cacheFromPool === null) {
    return null;
  }

  return {
    // We must also save the parent, so that when we resume we can detect
    // a refresh.
    parent: isPrimaryRenderer ? CacheContext._currentValue : CacheContext._currentValue2,
    pool: cacheFromPool
  };
}
function getOffscreenDeferredCache() {

  var cacheFromPool = peekCacheFromPool();

  if (cacheFromPool === null) {
    return null;
  }

  return {
    // We must also store the parent, so that when we resume we can detect
    // a refresh.
    parent: isPrimaryRenderer ? CacheContext._currentValue : CacheContext._currentValue2,
    pool: cacheFromPool
  };
}

function markUpdate(workInProgress) {
  // Tag the fiber with an update effect. This turns a Placement into
  // a PlacementAndUpdate.
  workInProgress.flags |= Update;
}

function markRef$1(workInProgress) {
  workInProgress.flags |= Ref | RefStatic;
}

function hadNoMutationsEffects(current, completedWork) {
  var didBailout = current !== null && current.child === completedWork.child;

  if (didBailout) {
    return true;
  }

  if ((completedWork.flags & ChildDeletion) !== NoFlags) {
    return false;
  } // TODO: If we move the `hadNoMutationsEffects` call after `bubbleProperties`
  // then we only have to check the `completedWork.subtreeFlags`.


  var child = completedWork.child;

  while (child !== null) {
    if ((child.flags & MutationMask) !== NoFlags || (child.subtreeFlags & MutationMask) !== NoFlags) {
      return false;
    }

    child = child.sibling;
  }

  return true;
}

var appendAllChildren;
var updateHostContainer;
var updateHostComponent$1;
var updateHostText$1;

if (supportsMutation) {
  // Mutation mode
  appendAllChildren = function (parent, workInProgress, needsVisibilityToggle, isHidden) {
    // We only have the top Fiber that was created but we need recurse down its
    // children to find all the terminal nodes.
    var node = workInProgress.child;

    while (node !== null) {
      if (node.tag === HostComponent || node.tag === HostText) {
        appendInitialChild(parent, node.stateNode);
      } else if (node.tag === HostPortal || ( supportsSingletons ? node.tag === HostSingleton : false)) ; else if (node.child !== null) {
        node.child.return = node;
        node = node.child;
        continue;
      }

      if (node === workInProgress) {
        return;
      } // $FlowFixMe[incompatible-use] found when upgrading Flow


      while (node.sibling === null) {
        // $FlowFixMe[incompatible-use] found when upgrading Flow
        if (node.return === null || node.return === workInProgress) {
          return;
        }

        node = node.return;
      } // $FlowFixMe[incompatible-use] found when upgrading Flow


      node.sibling.return = node.return;
      node = node.sibling;
    }
  };

  updateHostContainer = function (current, workInProgress) {// Noop
  };

  updateHostComponent$1 = function (current, workInProgress, type, newProps) {
    // If we have an alternate, that means this is an update and we need to
    // schedule a side-effect to do the updates.
    var oldProps = current.memoizedProps;

    if (oldProps === newProps) {
      // In mutation mode, this is sufficient for a bailout because
      // we won't touch this node even if children changed.
      return;
    } // If we get updated because one of our children updated, we don't
    // have newProps so we'll have to reuse them.
    // TODO: Split the update API as separate for the props vs. children.
    // Even better would be if children weren't special cased at all tho.


    var instance = workInProgress.stateNode;
    var currentHostContext = getHostContext(); // TODO: Experiencing an error where oldProps is null. Suggests a host
    // component is hitting the resume path. Figure out why. Possibly
    // related to `hidden`.

    var updatePayload = prepareUpdate(instance, type, oldProps, newProps, currentHostContext); // TODO: Type this specific to this type of component.

    workInProgress.updateQueue = updatePayload; // If the update payload indicates that there is a change or if there
    // is a new ref we mark this as an update. All the work is done in commitWork.

    if (updatePayload) {
      markUpdate(workInProgress);
    }
  };

  updateHostText$1 = function (current, workInProgress, oldText, newText) {
    // If the text differs, mark it as an update. All the work in done in commitWork.
    if (oldText !== newText) {
      markUpdate(workInProgress);
    }
  };
} else if (supportsPersistence) {
  // Persistent host tree mode
  appendAllChildren = function (parent, workInProgress, needsVisibilityToggle, isHidden) {
    // We only have the top Fiber that was created but we need recurse down its
    // children to find all the terminal nodes.
    var node = workInProgress.child;

    while (node !== null) {
      // eslint-disable-next-line no-labels
       if (node.tag === HostComponent) {
        var instance = node.stateNode;

        if (needsVisibilityToggle && isHidden) {
          // This child is inside a timed out tree. Hide it.
          var props = node.memoizedProps;
          var type = node.type;
          instance = cloneHiddenInstance(instance, type, props, node);
        }

        appendInitialChild(parent, instance);
      } else if (node.tag === HostText) {
        var _instance = node.stateNode;

        if (needsVisibilityToggle && isHidden) {
          // This child is inside a timed out tree. Hide it.
          var text = node.memoizedProps;
          _instance = cloneHiddenTextInstance(_instance, text, node);
        }

        appendInitialChild(parent, _instance);
      } else if (node.tag === HostPortal) ; else if (node.tag === OffscreenComponent && node.memoizedState !== null) {
        // The children in this boundary are hidden. Toggle their visibility
        // before appending.
        var child = node.child;

        if (child !== null) {
          child.return = node;
        }

        appendAllChildren(parent, node, true, true);
      } else if (node.child !== null) {
        node.child.return = node;
        node = node.child;
        continue;
      }

      node = node;

      if (node === workInProgress) {
        return;
      } // $FlowFixMe[incompatible-use] found when upgrading Flow


      while (node.sibling === null) {
        // $FlowFixMe[incompatible-use] found when upgrading Flow
        if (node.return === null || node.return === workInProgress) {
          return;
        }

        node = node.return;
      } // $FlowFixMe[incompatible-use] found when upgrading Flow


      node.sibling.return = node.return;
      node = node.sibling;
    }
  }; // An unfortunate fork of appendAllChildren because we have two different parent types.


  var appendAllChildrenToContainer = function (containerChildSet, workInProgress, needsVisibilityToggle, isHidden) {
    // We only have the top Fiber that was created but we need recurse down its
    // children to find all the terminal nodes.
    var node = workInProgress.child;

    while (node !== null) {
      // eslint-disable-next-line no-labels
       if (node.tag === HostComponent) {
        var instance = node.stateNode;

        if (needsVisibilityToggle && isHidden) {
          // This child is inside a timed out tree. Hide it.
          var props = node.memoizedProps;
          var type = node.type;
          instance = cloneHiddenInstance(instance, type, props, node);
        }

        appendChildToContainerChildSet(containerChildSet, instance);
      } else if (node.tag === HostText) {
        var _instance2 = node.stateNode;

        if (needsVisibilityToggle && isHidden) {
          // This child is inside a timed out tree. Hide it.
          var text = node.memoizedProps;
          _instance2 = cloneHiddenTextInstance(_instance2, text, node);
        }

        appendChildToContainerChildSet(containerChildSet, _instance2);
      } else if (node.tag === HostPortal) ; else if (node.tag === OffscreenComponent && node.memoizedState !== null) {
        // The children in this boundary are hidden. Toggle their visibility
        // before appending.
        var child = node.child;

        if (child !== null) {
          child.return = node;
        } // If Offscreen is not in manual mode, detached tree is hidden from user space.


        var _needsVisibilityToggle = !isOffscreenManual(node);

        appendAllChildrenToContainer(containerChildSet, node, _needsVisibilityToggle, true);
      } else if (node.child !== null) {
        node.child.return = node;
        node = node.child;
        continue;
      }

      node = node;

      if (node === workInProgress) {
        return;
      } // $FlowFixMe[incompatible-use] found when upgrading Flow


      while (node.sibling === null) {
        // $FlowFixMe[incompatible-use] found when upgrading Flow
        if (node.return === null || node.return === workInProgress) {
          return;
        }

        node = node.return;
      } // $FlowFixMe[incompatible-use] found when upgrading Flow


      node.sibling.return = node.return;
      node = node.sibling;
    }
  };

  updateHostContainer = function (current, workInProgress) {
    var portalOrRoot = workInProgress.stateNode;
    var childrenUnchanged = hadNoMutationsEffects(current, workInProgress);

    if (childrenUnchanged) ; else {
      var container = portalOrRoot.containerInfo;
      var newChildSet = createContainerChildSet(container); // If children might have changed, we have to add them all to the set.

      appendAllChildrenToContainer(newChildSet, workInProgress, false, false);
      portalOrRoot.pendingChildren = newChildSet; // Schedule an update on the container to swap out the container.

      markUpdate(workInProgress);
      finalizeContainerChildren(container, newChildSet);
    }
  };

  updateHostComponent$1 = function (current, workInProgress, type, newProps) {
    var currentInstance = current.stateNode;
    var oldProps = current.memoizedProps; // If there are no effects associated with this node, then none of our children had any updates.
    // This guarantees that we can reuse all of them.

    var childrenUnchanged = hadNoMutationsEffects(current, workInProgress);

    if (childrenUnchanged && oldProps === newProps) {
      // No changes, just reuse the existing instance.
      // Note that this might release a previous clone.
      workInProgress.stateNode = currentInstance;
      return;
    }

    var recyclableInstance = workInProgress.stateNode;
    var currentHostContext = getHostContext();
    var updatePayload = null;

    if (oldProps !== newProps) {
      updatePayload = prepareUpdate(recyclableInstance, type, oldProps, newProps, currentHostContext);
    }

    if (childrenUnchanged && updatePayload === null) {
      // No changes, just reuse the existing instance.
      // Note that this might release a previous clone.
      workInProgress.stateNode = currentInstance;
      return;
    }

    var newInstance = cloneInstance(currentInstance, updatePayload, type, oldProps, newProps, workInProgress, childrenUnchanged, recyclableInstance);

    if (finalizeInitialChildren(newInstance, type, newProps, currentHostContext)) {
      markUpdate(workInProgress);
    }

    workInProgress.stateNode = newInstance;

    if (childrenUnchanged) {
      // If there are no other effects in this tree, we need to flag this node as having one.
      // Even though we're not going to use it for anything.
      // Otherwise parents won't know that there are new children to propagate upwards.
      markUpdate(workInProgress);
    } else {
      // If children might have changed, we have to add them all to the set.
      appendAllChildren(newInstance, workInProgress, false, false);
    }
  };

  updateHostText$1 = function (current, workInProgress, oldText, newText) {
    if (oldText !== newText) {
      // If the text content differs, we'll create a new text instance for it.
      var rootContainerInstance = getRootHostContainer();
      var currentHostContext = getHostContext();
      workInProgress.stateNode = createTextInstance(newText, rootContainerInstance, currentHostContext, workInProgress); // We'll have to mark it as having an effect, even though we won't use the effect for anything.
      // This lets the parents know that at least one of their children has changed.

      markUpdate(workInProgress);
    } else {
      workInProgress.stateNode = current.stateNode;
    }
  };
} else {
  // No host operations
  updateHostContainer = function (current, workInProgress) {// Noop
  };

  updateHostComponent$1 = function (current, workInProgress, type, newProps) {// Noop
  };

  updateHostText$1 = function (current, workInProgress, oldText, newText) {// Noop
  };
}

function cutOffTailIfNeeded(renderState, hasRenderedATailFallback) {
  if (getIsHydrating()) {
    // If we're hydrating, we should consume as many items as we can
    // so we don't leave any behind.
    return;
  }

  switch (renderState.tailMode) {
    case 'hidden':
      {
        // Any insertions at the end of the tail list after this point
        // should be invisible. If there are already mounted boundaries
        // anything before them are not considered for collapsing.
        // Therefore we need to go through the whole tail to find if
        // there are any.
        var tailNode = renderState.tail;
        var lastTailNode = null;

        while (tailNode !== null) {
          if (tailNode.alternate !== null) {
            lastTailNode = tailNode;
          }

          tailNode = tailNode.sibling;
        } // Next we're simply going to delete all insertions after the
        // last rendered item.


        if (lastTailNode === null) {
          // All remaining items in the tail are insertions.
          renderState.tail = null;
        } else {
          // Detach the insertion after the last node that was already
          // inserted.
          lastTailNode.sibling = null;
        }

        break;
      }

    case 'collapsed':
      {
        // Any insertions at the end of the tail list after this point
        // should be invisible. If there are already mounted boundaries
        // anything before them are not considered for collapsing.
        // Therefore we need to go through the whole tail to find if
        // there are any.
        var _tailNode = renderState.tail;
        var _lastTailNode = null;

        while (_tailNode !== null) {
          if (_tailNode.alternate !== null) {
            _lastTailNode = _tailNode;
          }

          _tailNode = _tailNode.sibling;
        } // Next we're simply going to delete all insertions after the
        // last rendered item.


        if (_lastTailNode === null) {
          // All remaining items in the tail are insertions.
          if (!hasRenderedATailFallback && renderState.tail !== null) {
            // We suspended during the head. We want to show at least one
            // row at the tail. So we'll keep on and cut off the rest.
            renderState.tail.sibling = null;
          } else {
            renderState.tail = null;
          }
        } else {
          // Detach the insertion after the last node that was already
          // inserted.
          _lastTailNode.sibling = null;
        }

        break;
      }
  }
}

function bubbleProperties(completedWork) {
  var didBailout = completedWork.alternate !== null && completedWork.alternate.child === completedWork.child;
  var newChildLanes = NoLanes;
  var subtreeFlags = NoFlags;

  if (!didBailout) {
    // Bubble up the earliest expiration time.
    if ( (completedWork.mode & ProfileMode) !== NoMode) {
      // In profiling mode, resetChildExpirationTime is also used to reset
      // profiler durations.
      var actualDuration = completedWork.actualDuration;
      var treeBaseDuration = completedWork.selfBaseDuration;
      var child = completedWork.child;

      while (child !== null) {
        newChildLanes = mergeLanes(newChildLanes, mergeLanes(child.lanes, child.childLanes));
        subtreeFlags |= child.subtreeFlags;
        subtreeFlags |= child.flags; // When a fiber is cloned, its actualDuration is reset to 0. This value will
        // only be updated if work is done on the fiber (i.e. it doesn't bailout).
        // When work is done, it should bubble to the parent's actualDuration. If
        // the fiber has not been cloned though, (meaning no work was done), then
        // this value will reflect the amount of time spent working on a previous
        // render. In that case it should not bubble. We determine whether it was
        // cloned by comparing the child pointer.
        // $FlowFixMe[unsafe-addition] addition with possible null/undefined value

        actualDuration += child.actualDuration; // $FlowFixMe[unsafe-addition] addition with possible null/undefined value

        treeBaseDuration += child.treeBaseDuration;
        child = child.sibling;
      }

      completedWork.actualDuration = actualDuration;
      completedWork.treeBaseDuration = treeBaseDuration;
    } else {
      var _child = completedWork.child;

      while (_child !== null) {
        newChildLanes = mergeLanes(newChildLanes, mergeLanes(_child.lanes, _child.childLanes));
        subtreeFlags |= _child.subtreeFlags;
        subtreeFlags |= _child.flags; // Update the return pointer so the tree is consistent. This is a code
        // smell because it assumes the commit phase is never concurrent with
        // the render phase. Will address during refactor to alternate model.

        _child.return = completedWork;
        _child = _child.sibling;
      }
    }

    completedWork.subtreeFlags |= subtreeFlags;
  } else {
    // Bubble up the earliest expiration time.
    if ( (completedWork.mode & ProfileMode) !== NoMode) {
      // In profiling mode, resetChildExpirationTime is also used to reset
      // profiler durations.
      var _treeBaseDuration = completedWork.selfBaseDuration;
      var _child2 = completedWork.child;

      while (_child2 !== null) {
        newChildLanes = mergeLanes(newChildLanes, mergeLanes(_child2.lanes, _child2.childLanes)); // "Static" flags share the lifetime of the fiber/hook they belong to,
        // so we should bubble those up even during a bailout. All the other
        // flags have a lifetime only of a single render + commit, so we should
        // ignore them.

        subtreeFlags |= _child2.subtreeFlags & StaticMask;
        subtreeFlags |= _child2.flags & StaticMask; // $FlowFixMe[unsafe-addition] addition with possible null/undefined value

        _treeBaseDuration += _child2.treeBaseDuration;
        _child2 = _child2.sibling;
      }

      completedWork.treeBaseDuration = _treeBaseDuration;
    } else {
      var _child3 = completedWork.child;

      while (_child3 !== null) {
        newChildLanes = mergeLanes(newChildLanes, mergeLanes(_child3.lanes, _child3.childLanes)); // "Static" flags share the lifetime of the fiber/hook they belong to,
        // so we should bubble those up even during a bailout. All the other
        // flags have a lifetime only of a single render + commit, so we should
        // ignore them.

        subtreeFlags |= _child3.subtreeFlags & StaticMask;
        subtreeFlags |= _child3.flags & StaticMask; // Update the return pointer so the tree is consistent. This is a code
        // smell because it assumes the commit phase is never concurrent with
        // the render phase. Will address during refactor to alternate model.

        _child3.return = completedWork;
        _child3 = _child3.sibling;
      }
    }

    completedWork.subtreeFlags |= subtreeFlags;
  }

  completedWork.childLanes = newChildLanes;
  return didBailout;
}

function completeDehydratedSuspenseBoundary(current, workInProgress, nextState) {
  if (hasUnhydratedTailNodes() && (workInProgress.mode & ConcurrentMode) !== NoMode && (workInProgress.flags & DidCapture) === NoFlags) {
    warnIfUnhydratedTailNodes();
    resetHydrationState();
    workInProgress.flags |= ForceClientRender | Incomplete | ShouldCapture;
    return false;
  }

  var wasHydrated = popHydrationState(workInProgress);

  if (nextState !== null && nextState.dehydrated !== null) {
    // We might be inside a hydration state the first time we're picking up this
    // Suspense boundary, and also after we've reentered it for further hydration.
    if (current === null) {
      if (!wasHydrated) {
        throw new Error('A dehydrated suspense component was completed without a hydrated node. ' + 'This is probably a bug in React.');
      }

      prepareToHydrateHostSuspenseInstance(workInProgress);
      bubbleProperties(workInProgress);

      {
        if ((workInProgress.mode & ProfileMode) !== NoMode) {
          var isTimedOutSuspense = nextState !== null;

          if (isTimedOutSuspense) {
            // Don't count time spent in a timed out Suspense subtree as part of the base duration.
            var primaryChildFragment = workInProgress.child;

            if (primaryChildFragment !== null) {
              // $FlowFixMe Flow doesn't support type casting in combination with the -= operator
              workInProgress.treeBaseDuration -= primaryChildFragment.treeBaseDuration;
            }
          }
        }
      }

      return false;
    } else {
      // We might have reentered this boundary to hydrate it. If so, we need to reset the hydration
      // state since we're now exiting out of it. popHydrationState doesn't do that for us.
      resetHydrationState();

      if ((workInProgress.flags & DidCapture) === NoFlags) {
        // This boundary did not suspend so it's now hydrated and unsuspended.
        workInProgress.memoizedState = null;
      } // If nothing suspended, we need to schedule an effect to mark this boundary
      // as having hydrated so events know that they're free to be invoked.
      // It's also a signal to replay events and the suspense callback.
      // If something suspended, schedule an effect to attach retry listeners.
      // So we might as well always mark this.


      workInProgress.flags |= Update;
      bubbleProperties(workInProgress);

      {
        if ((workInProgress.mode & ProfileMode) !== NoMode) {
          var _isTimedOutSuspense = nextState !== null;

          if (_isTimedOutSuspense) {
            // Don't count time spent in a timed out Suspense subtree as part of the base duration.
            var _primaryChildFragment = workInProgress.child;

            if (_primaryChildFragment !== null) {
              // $FlowFixMe Flow doesn't support type casting in combination with the -= operator
              workInProgress.treeBaseDuration -= _primaryChildFragment.treeBaseDuration;
            }
          }
        }
      }

      return false;
    }
  } else {
    // Successfully completed this tree. If this was a forced client render,
    // there may have been recoverable errors during first hydration
    // attempt. If so, add them to a queue so we can log them in the
    // commit phase.
    upgradeHydrationErrorsToRecoverable(); // Fall through to normal Suspense path

    return true;
  }
}

function completeWork(current, workInProgress, renderLanes) {
  var newProps = workInProgress.pendingProps; // Note: This intentionally doesn't check if we're hydrating because comparing
  // to the current tree provider fiber is just as fast and less error-prone.
  // Ideally we would have a special version of the work loop only
  // for hydration.

  popTreeContext(workInProgress);

  switch (workInProgress.tag) {
    case IndeterminateComponent:
    case LazyComponent:
    case SimpleMemoComponent:
    case FunctionComponent:
    case ForwardRef:
    case Fragment:
    case Mode:
    case Profiler:
    case ContextConsumer:
    case MemoComponent:
      bubbleProperties(workInProgress);
      return null;

    case ClassComponent:
      {
        var Component = workInProgress.type;

        if (isContextProvider(Component)) {
          popContext();
        }

        bubbleProperties(workInProgress);
        return null;
      }

    case HostRoot:
      {
        var fiberRoot = workInProgress.stateNode;

        {
          var previousCache = null;

          if (current !== null) {
            previousCache = current.memoizedState.cache;
          }

          var cache = workInProgress.memoizedState.cache;

          if (cache !== previousCache) {
            // Run passive effects to retain/release the cache.
            workInProgress.flags |= Passive;
          }

          popCacheProvider();
        }
        popHostContainer();
        popTopLevelContextObject();
        resetWorkInProgressVersions();

        if (fiberRoot.pendingContext) {
          fiberRoot.context = fiberRoot.pendingContext;
          fiberRoot.pendingContext = null;
        }

        if (current === null || current.child === null) {
          // If we hydrated, pop so that we can delete any remaining children
          // that weren't hydrated.
          var wasHydrated = popHydrationState(workInProgress);

          if (wasHydrated) {
            // If we hydrated, then we'll need to schedule an update for
            // the commit side-effects on the root.
            markUpdate(workInProgress);
          } else {
            if (current !== null) {
              var prevState = current.memoizedState;

              if ( // Check if this is a client root
              !prevState.isDehydrated || // Check if we reverted to client rendering (e.g. due to an error)
              (workInProgress.flags & ForceClientRender) !== NoFlags) {
                // Schedule an effect to clear this container at the start of the
                // next commit. This handles the case of React rendering into a
                // container with previous children. It's also safe to do for
                // updates too, because current.child would only be null if the
                // previous render was null (so the container would already
                // be empty).
                workInProgress.flags |= Snapshot; // If this was a forced client render, there may have been
                // recoverable errors during first hydration attempt. If so, add
                // them to a queue so we can log them in the commit phase.

                upgradeHydrationErrorsToRecoverable();
              }
            }
          }
        }

        updateHostContainer(current, workInProgress);
        bubbleProperties(workInProgress);

        return null;
      }

    case HostResource:
      {
        if ( supportsResources) {
          popHostContext(workInProgress);
          var currentRef = current ? current.ref : null;

          if (currentRef !== workInProgress.ref) {
            markRef$1(workInProgress);
          }

          if (current === null || current.memoizedState !== workInProgress.memoizedState) {
            // The workInProgress resource is different than the current one or the current
            // one does not exist
            markUpdate(workInProgress);
          }

          bubbleProperties(workInProgress);
          return null;
        }
      }
    // eslint-disable-next-line-no-fallthrough

    case HostSingleton:
      {
        if ( supportsSingletons) {
          popHostContext(workInProgress);
          var rootContainerInstance = getRootHostContainer();
          var type = workInProgress.type;

          if (current !== null && workInProgress.stateNode != null) {
            updateHostComponent$1(current, workInProgress, type, newProps);

            if (current.ref !== workInProgress.ref) {
              markRef$1(workInProgress);
            }
          } else {
            if (!newProps) {
              if (workInProgress.stateNode === null) {
                throw new Error('We must have new props for new mounts. This error is likely ' + 'caused by a bug in React. Please file an issue.');
              } // This can happen when we abort work.


              bubbleProperties(workInProgress);
              return null;
            }

            var currentHostContext = getHostContext();

            var _wasHydrated = popHydrationState(workInProgress);

            if (_wasHydrated) {
              // We ignore the boolean indicating there is an updateQueue because
              // it is used only to set text children and HostSingletons do not
              // use them.
              prepareToHydrateHostInstance(workInProgress, currentHostContext);
            } else {
              workInProgress.stateNode = resolveSingletonInstance(type, newProps, rootContainerInstance, currentHostContext, true);
              markUpdate(workInProgress);
            }

            if (workInProgress.ref !== null) {
              // If there is a ref on a host node we need to schedule a callback
              markRef$1(workInProgress);
            }
          }

          bubbleProperties(workInProgress);
          return null;
        }
      }
    // eslint-disable-next-line-no-fallthrough

    case HostComponent:
      {
        popHostContext(workInProgress);
        var _type = workInProgress.type;

        if (current !== null && workInProgress.stateNode != null) {
          updateHostComponent$1(current, workInProgress, _type, newProps);

          if (current.ref !== workInProgress.ref) {
            markRef$1(workInProgress);
          }
        } else {
          if (!newProps) {
            if (workInProgress.stateNode === null) {
              throw new Error('We must have new props for new mounts. This error is likely ' + 'caused by a bug in React. Please file an issue.');
            } // This can happen when we abort work.


            bubbleProperties(workInProgress);
            return null;
          }

          var _currentHostContext = getHostContext(); // TODO: Move createInstance to beginWork and keep it on a context
          // "stack" as the parent. Then append children as we go in beginWork
          // or completeWork depending on whether we want to add them top->down or
          // bottom->up. Top->down is faster in IE11.


          var _wasHydrated2 = popHydrationState(workInProgress);

          if (_wasHydrated2) {
            // TODO: Move this and createInstance step into the beginPhase
            // to consolidate.
            if (prepareToHydrateHostInstance(workInProgress, _currentHostContext)) {
              // If changes to the hydrated node need to be applied at the
              // commit-phase we mark this as such.
              markUpdate(workInProgress);
            }
          } else {
            var _rootContainerInstance = getRootHostContainer();

            var instance = createInstance(_type, newProps, _rootContainerInstance, _currentHostContext, workInProgress);
            appendAllChildren(instance, workInProgress, false, false);
            workInProgress.stateNode = instance; // Certain renderers require commit-time effects for initial mount.
            // (eg DOM renderer supports auto-focus for certain elements).
            // Make sure such renderers get scheduled for later work.

            if (finalizeInitialChildren(instance, _type, newProps, _currentHostContext)) {
              markUpdate(workInProgress);
            }
          }

          if (workInProgress.ref !== null) {
            // If there is a ref on a host node we need to schedule a callback
            markRef$1(workInProgress);
          }
        }

        bubbleProperties(workInProgress);
        return null;
      }

    case HostText:
      {
        var newText = newProps;

        if (current && workInProgress.stateNode != null) {
          var oldText = current.memoizedProps; // If we have an alternate, that means this is an update and we need
          // to schedule a side-effect to do the updates.

          updateHostText$1(current, workInProgress, oldText, newText);
        } else {
          if (typeof newText !== 'string') {
            if (workInProgress.stateNode === null) {
              throw new Error('We must have new props for new mounts. This error is likely ' + 'caused by a bug in React. Please file an issue.');
            } // This can happen when we abort work.

          }

          var _rootContainerInstance2 = getRootHostContainer();

          var _currentHostContext2 = getHostContext();

          var _wasHydrated3 = popHydrationState(workInProgress);

          if (_wasHydrated3) {
            if (prepareToHydrateHostTextInstance(workInProgress)) {
              markUpdate(workInProgress);
            }
          } else {
            workInProgress.stateNode = createTextInstance(newText, _rootContainerInstance2, _currentHostContext2, workInProgress);
          }
        }

        bubbleProperties(workInProgress);
        return null;
      }

    case SuspenseComponent:
      {
        popSuspenseHandler(workInProgress);
        var nextState = workInProgress.memoizedState; // Special path for dehydrated boundaries. We may eventually move this
        // to its own fiber type so that we can add other kinds of hydration
        // boundaries that aren't associated with a Suspense tree. In anticipation
        // of such a refactor, all the hydration logic is contained in
        // this branch.

        if (current === null || current.memoizedState !== null && current.memoizedState.dehydrated !== null) {
          var fallthroughToNormalSuspensePath = completeDehydratedSuspenseBoundary(current, workInProgress, nextState);

          if (!fallthroughToNormalSuspensePath) {
            if (workInProgress.flags & ShouldCapture) {
              // Special case. There were remaining unhydrated nodes. We treat
              // this as a mismatch. Revert to client rendering.
              return workInProgress;
            } else {
              // Did not finish hydrating, either because this is the initial
              // render or because something suspended.
              return null;
            }
          } // Continue with the normal Suspense path.

        }

        if ((workInProgress.flags & DidCapture) !== NoFlags) {
          // Something suspended. Re-render with the fallback children.
          workInProgress.lanes = renderLanes; // Do not reset the effect list.

          if ( (workInProgress.mode & ProfileMode) !== NoMode) {
            transferActualDuration(workInProgress);
          } // Don't bubble properties in this case.


          return workInProgress;
        }

        var nextDidTimeout = nextState !== null;
        var prevDidTimeout = current !== null && current.memoizedState !== null;

        if ( nextDidTimeout) {
          var offscreenFiber = workInProgress.child;
          var _previousCache = null;

          if (offscreenFiber.alternate !== null && offscreenFiber.alternate.memoizedState !== null && offscreenFiber.alternate.memoizedState.cachePool !== null) {
            _previousCache = offscreenFiber.alternate.memoizedState.cachePool.pool;
          }

          var _cache = null;

          if (offscreenFiber.memoizedState !== null && offscreenFiber.memoizedState.cachePool !== null) {
            _cache = offscreenFiber.memoizedState.cachePool.pool;
          }

          if (_cache !== _previousCache) {
            // Run passive effects to retain/release the cache.
            offscreenFiber.flags |= Passive;
          }
        } // If the suspended state of the boundary changes, we need to schedule
        // a passive effect, which is when we process the transitions


        if (nextDidTimeout !== prevDidTimeout) {
          // an effect to toggle the subtree's visibility. When we switch from
          // fallback -> primary, the inner Offscreen fiber schedules this effect
          // as part of its normal complete phase. But when we switch from
          // primary -> fallback, the inner Offscreen fiber does not have a complete
          // phase. So we need to schedule its effect here.
          //
          // We also use this flag to connect/disconnect the effects, but the same
          // logic applies: when re-connecting, the Offscreen fiber's complete
          // phase will handle scheduling the effect. It's only when the fallback
          // is active that we have to do anything special.


          if (nextDidTimeout) {
            var _offscreenFiber2 = workInProgress.child;
            _offscreenFiber2.flags |= Visibility;
          }
        }

        var wakeables = workInProgress.updateQueue;

        if (wakeables !== null) {
          // Schedule an effect to attach a retry listener to the promise.
          // TODO: Move to passive phase
          workInProgress.flags |= Update;
        }

        bubbleProperties(workInProgress);

        {
          if ((workInProgress.mode & ProfileMode) !== NoMode) {
            if (nextDidTimeout) {
              // Don't count time spent in a timed out Suspense subtree as part of the base duration.
              var primaryChildFragment = workInProgress.child;

              if (primaryChildFragment !== null) {
                // $FlowFixMe Flow doesn't support type casting in combination with the -= operator
                workInProgress.treeBaseDuration -= primaryChildFragment.treeBaseDuration;
              }
            }
          }
        }

        return null;
      }

    case HostPortal:
      popHostContainer();
      updateHostContainer(current, workInProgress);

      if (current === null) {
        preparePortalMount(workInProgress.stateNode.containerInfo);
      }

      bubbleProperties(workInProgress);
      return null;

    case ContextProvider:
      // Pop provider fiber
      var context = workInProgress.type._context;
      popProvider(context);
      bubbleProperties(workInProgress);
      return null;

    case IncompleteClassComponent:
      {
        // Same as class component case. I put it down here so that the tags are
        // sequential to ensure this switch is compiled to a jump table.
        var _Component = workInProgress.type;

        if (isContextProvider(_Component)) {
          popContext();
        }

        bubbleProperties(workInProgress);
        return null;
      }

    case SuspenseListComponent:
      {
        popSuspenseListContext();
        var renderState = workInProgress.memoizedState;

        if (renderState === null) {
          // We're running in the default, "independent" mode.
          // We don't do anything in this mode.
          bubbleProperties(workInProgress);
          return null;
        }

        var didSuspendAlready = (workInProgress.flags & DidCapture) !== NoFlags;
        var renderedTail = renderState.rendering;

        if (renderedTail === null) {
          // We just rendered the head.
          if (!didSuspendAlready) {
            // This is the first pass. We need to figure out if anything is still
            // suspended in the rendered set.
            // If new content unsuspended, but there's still some content that
            // didn't. Then we need to do a second pass that forces everything
            // to keep showing their fallbacks.
            // We might be suspended if something in this render pass suspended, or
            // something in the previous committed pass suspended. Otherwise,
            // there's no chance so we can skip the expensive call to
            // findFirstSuspended.
            var cannotBeSuspended = renderHasNotSuspendedYet() && (current === null || (current.flags & DidCapture) === NoFlags);

            if (!cannotBeSuspended) {
              var row = workInProgress.child;

              while (row !== null) {
                var suspended = findFirstSuspended(row);

                if (suspended !== null) {
                  didSuspendAlready = true;
                  workInProgress.flags |= DidCapture;
                  cutOffTailIfNeeded(renderState, false); // If this is a newly suspended tree, it might not get committed as
                  // part of the second pass. In that case nothing will subscribe to
                  // its thenables. Instead, we'll transfer its thenables to the
                  // SuspenseList so that it can retry if they resolve.
                  // There might be multiple of these in the list but since we're
                  // going to wait for all of them anyway, it doesn't really matter
                  // which ones gets to ping. In theory we could get clever and keep
                  // track of how many dependencies remain but it gets tricky because
                  // in the meantime, we can add/remove/change items and dependencies.
                  // We might bail out of the loop before finding any but that
                  // doesn't matter since that means that the other boundaries that
                  // we did find already has their listeners attached.

                  var newThenables = suspended.updateQueue;

                  if (newThenables !== null) {
                    workInProgress.updateQueue = newThenables;
                    workInProgress.flags |= Update;
                  } // Rerender the whole list, but this time, we'll force fallbacks
                  // to stay in place.
                  // Reset the effect flags before doing the second pass since that's now invalid.
                  // Reset the child fibers to their original state.


                  workInProgress.subtreeFlags = NoFlags;
                  resetChildFibers(workInProgress, renderLanes); // Set up the Suspense List Context to force suspense and
                  // immediately rerender the children.

                  pushSuspenseListContext(workInProgress, setShallowSuspenseListContext(suspenseStackCursor.current, ForceSuspenseFallback)); // Don't bubble properties in this case.

                  return workInProgress.child;
                }

                row = row.sibling;
              }
            }

            if (renderState.tail !== null && now() > getRenderTargetTime()) {
              // We have already passed our CPU deadline but we still have rows
              // left in the tail. We'll just give up further attempts to render
              // the main content and only render fallbacks.
              workInProgress.flags |= DidCapture;
              didSuspendAlready = true;
              cutOffTailIfNeeded(renderState, false); // Since nothing actually suspended, there will nothing to ping this
              // to get it started back up to attempt the next item. While in terms
              // of priority this work has the same priority as this current render,
              // it's not part of the same transition once the transition has
              // committed. If it's sync, we still want to yield so that it can be
              // painted. Conceptually, this is really the same as pinging.
              // We can use any RetryLane even if it's the one currently rendering
              // since we're leaving it behind on this node.

              workInProgress.lanes = SomeRetryLane;
            }
          } else {
            cutOffTailIfNeeded(renderState, false);
          } // Next we're going to render the tail.

        } else {
          // Append the rendered row to the child list.
          if (!didSuspendAlready) {
            var _suspended = findFirstSuspended(renderedTail);

            if (_suspended !== null) {
              workInProgress.flags |= DidCapture;
              didSuspendAlready = true; // Ensure we transfer the update queue to the parent so that it doesn't
              // get lost if this row ends up dropped during a second pass.

              var _newThenables = _suspended.updateQueue;

              if (_newThenables !== null) {
                workInProgress.updateQueue = _newThenables;
                workInProgress.flags |= Update;
              }

              cutOffTailIfNeeded(renderState, true); // This might have been modified.

              if (renderState.tail === null && renderState.tailMode === 'hidden' && !renderedTail.alternate && !getIsHydrating() // We don't cut it if we're hydrating.
              ) {
                  // We're done.
                  bubbleProperties(workInProgress);
                  return null;
                }
            } else if ( // The time it took to render last row is greater than the remaining
            // time we have to render. So rendering one more row would likely
            // exceed it.
            now() * 2 - renderState.renderingStartTime > getRenderTargetTime() && renderLanes !== OffscreenLane) {
              // We have now passed our CPU deadline and we'll just give up further
              // attempts to render the main content and only render fallbacks.
              // The assumption is that this is usually faster.
              workInProgress.flags |= DidCapture;
              didSuspendAlready = true;
              cutOffTailIfNeeded(renderState, false); // Since nothing actually suspended, there will nothing to ping this
              // to get it started back up to attempt the next item. While in terms
              // of priority this work has the same priority as this current render,
              // it's not part of the same transition once the transition has
              // committed. If it's sync, we still want to yield so that it can be
              // painted. Conceptually, this is really the same as pinging.
              // We can use any RetryLane even if it's the one currently rendering
              // since we're leaving it behind on this node.

              workInProgress.lanes = SomeRetryLane;
            }
          }

          if (renderState.isBackwards) {
            // The effect list of the backwards tail will have been added
            // to the end. This breaks the guarantee that life-cycles fire in
            // sibling order but that isn't a strong guarantee promised by React.
            // Especially since these might also just pop in during future commits.
            // Append to the beginning of the list.
            renderedTail.sibling = workInProgress.child;
            workInProgress.child = renderedTail;
          } else {
            var previousSibling = renderState.last;

            if (previousSibling !== null) {
              previousSibling.sibling = renderedTail;
            } else {
              workInProgress.child = renderedTail;
            }

            renderState.last = renderedTail;
          }
        }

        if (renderState.tail !== null) {
          // We still have tail rows to render.
          // Pop a row.
          var next = renderState.tail;
          renderState.rendering = next;
          renderState.tail = next.sibling;
          renderState.renderingStartTime = now();
          next.sibling = null; // Restore the context.
          // TODO: We can probably just avoid popping it instead and only
          // setting it the first time we go from not suspended to suspended.

          var suspenseContext = suspenseStackCursor.current;

          if (didSuspendAlready) {
            suspenseContext = setShallowSuspenseListContext(suspenseContext, ForceSuspenseFallback);
          } else {
            suspenseContext = setDefaultShallowSuspenseListContext(suspenseContext);
          }

          pushSuspenseListContext(workInProgress, suspenseContext); // Do a pass over the next row.
          // Don't bubble properties in this case.

          return next;
        }

        bubbleProperties(workInProgress);
        return null;
      }

    case ScopeComponent:
      {

        break;
      }

    case OffscreenComponent:
    case LegacyHiddenComponent:
      {
        popSuspenseHandler(workInProgress);
        popHiddenContext();
        var _nextState = workInProgress.memoizedState;
        var nextIsHidden = _nextState !== null; // Schedule a Visibility effect if the visibility has changed

        {
          if (current !== null) {
            var _prevState = current.memoizedState;
            var prevIsHidden = _prevState !== null;

            if (prevIsHidden !== nextIsHidden) {
              workInProgress.flags |= Visibility;
            }
          } else {
            // On initial mount, we only need a Visibility effect if the tree
            // is hidden.
            if (nextIsHidden) {
              workInProgress.flags |= Visibility;
            }
          }
        }

        if (!nextIsHidden || (workInProgress.mode & ConcurrentMode) === NoMode) {
          bubbleProperties(workInProgress);
        } else {
          // Don't bubble properties for hidden children unless we're rendering
          // at offscreen priority.
          if (includesSomeLane(renderLanes, OffscreenLane) && // Also don't bubble if the tree suspended
          (workInProgress.flags & DidCapture) === NoLanes) {
            bubbleProperties(workInProgress); // Check if there was an insertion or update in the hidden subtree.
            // If so, we need to hide those nodes in the commit phase, so
            // schedule a visibility effect.

            if ( workInProgress.subtreeFlags & (Placement | Update)) {
              workInProgress.flags |= Visibility;
            }
          }
        }

        if (workInProgress.updateQueue !== null) {
          // Schedule an effect to attach Suspense retry listeners
          // TODO: Move to passive phase
          workInProgress.flags |= Update;
        }

        {
          var _previousCache2 = null;

          if (current !== null && current.memoizedState !== null && current.memoizedState.cachePool !== null) {
            _previousCache2 = current.memoizedState.cachePool.pool;
          }

          var _cache2 = null;

          if (workInProgress.memoizedState !== null && workInProgress.memoizedState.cachePool !== null) {
            _cache2 = workInProgress.memoizedState.cachePool.pool;
          }

          if (_cache2 !== _previousCache2) {
            // Run passive effects to retain/release the cache.
            workInProgress.flags |= Passive;
          }
        }

        popTransition(workInProgress, current);
        return null;
      }

    case CacheComponent:
      {
        {
          var _previousCache3 = null;

          if (current !== null) {
            _previousCache3 = current.memoizedState.cache;
          }

          var _cache3 = workInProgress.memoizedState.cache;

          if (_cache3 !== _previousCache3) {
            // Run passive effects to retain/release the cache.
            workInProgress.flags |= Passive;
          }

          popCacheProvider();
          bubbleProperties(workInProgress);
        }

        return null;
      }

    case TracingMarkerComponent:
      {

        return null;
      }
  }

  throw new Error("Unknown unit of work tag (" + workInProgress.tag + "). This error is likely caused by a bug in " + 'React. Please file an issue.');
}

function unwindWork(current, workInProgress, renderLanes) {
  // Note: This intentionally doesn't check if we're hydrating because comparing
  // to the current tree provider fiber is just as fast and less error-prone.
  // Ideally we would have a special version of the work loop only
  // for hydration.
  popTreeContext(workInProgress);

  switch (workInProgress.tag) {
    case ClassComponent:
      {
        var Component = workInProgress.type;

        if (isContextProvider(Component)) {
          popContext();
        }

        var flags = workInProgress.flags;

        if (flags & ShouldCapture) {
          workInProgress.flags = flags & ~ShouldCapture | DidCapture;

          if ( (workInProgress.mode & ProfileMode) !== NoMode) {
            transferActualDuration(workInProgress);
          }

          return workInProgress;
        }

        return null;
      }

    case HostRoot:
      {
        var root = workInProgress.stateNode;

        {
          var cache = workInProgress.memoizedState.cache;
          popCacheProvider();
        }
        popHostContainer();
        popTopLevelContextObject();
        resetWorkInProgressVersions();
        var _flags = workInProgress.flags;

        if ((_flags & ShouldCapture) !== NoFlags && (_flags & DidCapture) === NoFlags) {
          // There was an error during render that wasn't captured by a suspense
          // boundary. Do a second pass on the root to unmount the children.
          workInProgress.flags = _flags & ~ShouldCapture | DidCapture;
          return workInProgress;
        } // We unwound to the root without completing it. Exit.


        return null;
      }

    case HostResource:
    case HostSingleton:
    case HostComponent:
      {
        // TODO: popHydrationState
        popHostContext(workInProgress);
        return null;
      }

    case SuspenseComponent:
      {
        popSuspenseHandler(workInProgress);
        var suspenseState = workInProgress.memoizedState;

        if (suspenseState !== null && suspenseState.dehydrated !== null) {
          if (workInProgress.alternate === null) {
            throw new Error('Threw in newly mounted dehydrated component. This is likely a bug in ' + 'React. Please file an issue.');
          }

          resetHydrationState();
        }

        var _flags2 = workInProgress.flags;

        if (_flags2 & ShouldCapture) {
          workInProgress.flags = _flags2 & ~ShouldCapture | DidCapture; // Captured a suspense effect. Re-render the boundary.

          if ( (workInProgress.mode & ProfileMode) !== NoMode) {
            transferActualDuration(workInProgress);
          }

          return workInProgress;
        }

        return null;
      }

    case SuspenseListComponent:
      {
        popSuspenseListContext(); // SuspenseList doesn't actually catch anything. It should've been
        // caught by a nested boundary. If not, it should bubble through.

        return null;
      }

    case HostPortal:
      popHostContainer();
      return null;

    case ContextProvider:
      var context = workInProgress.type._context;
      popProvider(context);
      return null;

    case OffscreenComponent:
    case LegacyHiddenComponent:
      {
        popSuspenseHandler(workInProgress);
        popHiddenContext();
        popTransition(workInProgress, current);
        var _flags3 = workInProgress.flags;

        if (_flags3 & ShouldCapture) {
          workInProgress.flags = _flags3 & ~ShouldCapture | DidCapture; // Captured a suspense effect. Re-render the boundary.

          if ( (workInProgress.mode & ProfileMode) !== NoMode) {
            transferActualDuration(workInProgress);
          }

          return workInProgress;
        }

        return null;
      }

    case CacheComponent:
      {
        var _cache = workInProgress.memoizedState.cache;
        popCacheProvider();
      }

      return null;

    case TracingMarkerComponent:

      return null;

    default:
      return null;
  }
}

function unwindInterruptedWork(current, interruptedWork, renderLanes) {
  // Note: This intentionally doesn't check if we're hydrating because comparing
  // to the current tree provider fiber is just as fast and less error-prone.
  // Ideally we would have a special version of the work loop only
  // for hydration.
  popTreeContext(interruptedWork);

  switch (interruptedWork.tag) {
    case ClassComponent:
      {
        var childContextTypes = interruptedWork.type.childContextTypes;

        if (childContextTypes !== null && childContextTypes !== undefined) {
          popContext();
        }

        break;
      }

    case HostRoot:
      {
        var root = interruptedWork.stateNode;

        {
          var cache = interruptedWork.memoizedState.cache;
          popCacheProvider();
        }
        popHostContainer();
        popTopLevelContextObject();
        resetWorkInProgressVersions();
        break;
      }

    case HostResource:
    case HostSingleton:
    case HostComponent:
      {
        popHostContext(interruptedWork);
        break;
      }

    case HostPortal:
      popHostContainer();
      break;

    case SuspenseComponent:
      popSuspenseHandler(interruptedWork);
      break;

    case SuspenseListComponent:
      popSuspenseListContext();
      break;

    case ContextProvider:
      var context = interruptedWork.type._context;
      popProvider(context);
      break;

    case OffscreenComponent:
    case LegacyHiddenComponent:
      popSuspenseHandler(interruptedWork);
      popHiddenContext();
      popTransition(interruptedWork, current);
      break;

    case CacheComponent:
      {
        var _cache2 = interruptedWork.memoizedState.cache;
        popCacheProvider();
      }

      break;
  }
}

// Allows us to avoid traversing the return path to find the nearest Offscreen ancestor.


var offscreenSubtreeIsHidden = false;
var offscreenSubtreeWasHidden = false;
var PossiblyWeakSet = typeof WeakSet === 'function' ? WeakSet : Set;
var nextEffect = null; // Used for Profiling builds to track updaters.

var inProgressLanes = null;
var inProgressRoot = null;

function shouldProfile(current) {
  return  (current.mode & ProfileMode) !== NoMode && (getExecutionContext() & CommitContext) !== NoContext;
}

var callComponentWillUnmountWithTimer = function (current, instance) {
  instance.props = current.memoizedProps;
  instance.state = current.memoizedState;

  if (shouldProfile(current)) {
    try {
      startLayoutEffectTimer();
      instance.componentWillUnmount();
    } finally {
      recordLayoutEffectDuration(current);
    }
  } else {
    instance.componentWillUnmount();
  }
}; // Capture errors so they don't interrupt unmounting.


function safelyCallComponentWillUnmount(current, nearestMountedAncestor, instance) {
  try {
    callComponentWillUnmountWithTimer(current, instance);
  } catch (error) {
    captureCommitPhaseError(current, nearestMountedAncestor, error);
  }
} // Capture errors so they don't interrupt mounting.


function safelyAttachRef(current, nearestMountedAncestor) {
  try {
    commitAttachRef(current);
  } catch (error) {
    captureCommitPhaseError(current, nearestMountedAncestor, error);
  }
}

function safelyDetachRef(current, nearestMountedAncestor) {
  var ref = current.ref;
  var refCleanup = current.refCleanup;

  if (ref !== null) {
    if (typeof refCleanup === 'function') {
      try {
        if (shouldProfile(current)) {
          try {
            startLayoutEffectTimer();
            refCleanup();
          } finally {
            recordLayoutEffectDuration(current);
          }
        } else {
          refCleanup();
        }
      } catch (error) {
        captureCommitPhaseError(current, nearestMountedAncestor, error);
      } finally {
        // `refCleanup` has been called. Nullify all references to it to prevent double invocation.
        current.refCleanup = null;
        var finishedWork = current.alternate;

        if (finishedWork != null) {
          finishedWork.refCleanup = null;
        }
      }
    } else if (typeof ref === 'function') {
      var retVal;

      try {
        if (shouldProfile(current)) {
          try {
            startLayoutEffectTimer();
            retVal = ref(null);
          } finally {
            recordLayoutEffectDuration(current);
          }
        } else {
          retVal = ref(null);
        }
      } catch (error) {
        captureCommitPhaseError(current, nearestMountedAncestor, error);
      }
    } else {
      // $FlowFixMe unable to narrow type to RefObject
      ref.current = null;
    }
  }
}

function safelyCallDestroy(current, nearestMountedAncestor, destroy) {
  try {
    destroy();
  } catch (error) {
    captureCommitPhaseError(current, nearestMountedAncestor, error);
  }
}

var focusedInstanceHandle = null;
var shouldFireAfterActiveInstanceBlur = false;
function commitBeforeMutationEffects(root, firstChild) {
  focusedInstanceHandle = prepareForCommit(root.containerInfo);
  nextEffect = firstChild;
  commitBeforeMutationEffects_begin(); // We no longer need to track the active instance fiber

  var shouldFire = shouldFireAfterActiveInstanceBlur;
  shouldFireAfterActiveInstanceBlur = false;
  focusedInstanceHandle = null;
  return shouldFire;
}

function commitBeforeMutationEffects_begin() {
  while (nextEffect !== null) {
    var fiber = nextEffect; // This phase is only used for beforeActiveInstanceBlur.

    var child = fiber.child;

    if ((fiber.subtreeFlags & BeforeMutationMask) !== NoFlags && child !== null) {
      child.return = fiber;
      nextEffect = child;
    } else {
      commitBeforeMutationEffects_complete();
    }
  }
}

function commitBeforeMutationEffects_complete() {
  while (nextEffect !== null) {
    var fiber = nextEffect;

    try {
      commitBeforeMutationEffectsOnFiber(fiber);
    } catch (error) {
      captureCommitPhaseError(fiber, fiber.return, error);
    }
    var sibling = fiber.sibling;

    if (sibling !== null) {
      sibling.return = fiber.return;
      nextEffect = sibling;
      return;
    }

    nextEffect = fiber.return;
  }
}

function commitBeforeMutationEffectsOnFiber(finishedWork) {
  var current = finishedWork.alternate;
  var flags = finishedWork.flags;

  switch (finishedWork.tag) {
    case FunctionComponent:
      {
        {
          if ((flags & Update) !== NoFlags) {
            commitUseEffectEventMount(finishedWork);
          }
        }

        break;
      }

    case ForwardRef:
    case SimpleMemoComponent:
      {
        break;
      }

    case ClassComponent:
      {
        if ((flags & Snapshot) !== NoFlags) {
          if (current !== null) {
            var prevProps = current.memoizedProps;
            var prevState = current.memoizedState;
            var instance = finishedWork.stateNode; // We could update instance props and state here,

            var snapshot = instance.getSnapshotBeforeUpdate(finishedWork.elementType === finishedWork.type ? prevProps : resolveDefaultProps(finishedWork.type, prevProps), prevState);

            instance.__reactInternalSnapshotBeforeUpdate = snapshot;
          }
        }

        break;
      }

    case HostRoot:
      {
        if ((flags & Snapshot) !== NoFlags) {
          if (supportsMutation) {
            var root = finishedWork.stateNode;
            clearContainer(root.containerInfo);
          }
        }

        break;
      }

    case HostComponent:
    case HostResource:
    case HostSingleton:
    case HostText:
    case HostPortal:
    case IncompleteClassComponent:
      // Nothing to do for these component types
      break;

    default:
      {
        if ((flags & Snapshot) !== NoFlags) {
          throw new Error('This unit of work tag should not have side-effects. This error is ' + 'likely caused by a bug in React. Please file an issue.');
        }
      }
  }
}

function commitHookEffectListUnmount(flags, finishedWork, nearestMountedAncestor) {
  var updateQueue = finishedWork.updateQueue;
  var lastEffect = updateQueue !== null ? updateQueue.lastEffect : null;

  if (lastEffect !== null) {
    var firstEffect = lastEffect.next;
    var effect = firstEffect;

    do {
      if ((effect.tag & flags) === flags) {
        // Unmount
        var destroy = effect.destroy;
        effect.destroy = undefined;

        if (destroy !== undefined) {
          {
            if ((flags & Passive$1) !== NoFlags$1) {
              markComponentPassiveEffectUnmountStarted(finishedWork);
            } else if ((flags & Layout) !== NoFlags$1) {
              markComponentLayoutEffectUnmountStarted(finishedWork);
            }
          }

          safelyCallDestroy(finishedWork, nearestMountedAncestor, destroy);

          {
            if ((flags & Passive$1) !== NoFlags$1) {
              markComponentPassiveEffectUnmountStopped();
            } else if ((flags & Layout) !== NoFlags$1) {
              markComponentLayoutEffectUnmountStopped();
            }
          }
        }
      }

      effect = effect.next;
    } while (effect !== firstEffect);
  }
}

function commitHookEffectListMount(flags, finishedWork) {
  var updateQueue = finishedWork.updateQueue;
  var lastEffect = updateQueue !== null ? updateQueue.lastEffect : null;

  if (lastEffect !== null) {
    var firstEffect = lastEffect.next;
    var effect = firstEffect;

    do {
      if ((effect.tag & flags) === flags) {
        {
          if ((flags & Passive$1) !== NoFlags$1) {
            markComponentPassiveEffectMountStarted(finishedWork);
          } else if ((flags & Layout) !== NoFlags$1) {
            markComponentLayoutEffectMountStarted(finishedWork);
          }
        } // Mount


        var create = effect.create;

        effect.destroy = create();

        {
          if ((flags & Passive$1) !== NoFlags$1) {
            markComponentPassiveEffectMountStopped();
          } else if ((flags & Layout) !== NoFlags$1) {
            markComponentLayoutEffectMountStopped();
          }
        }
      }

      effect = effect.next;
    } while (effect !== firstEffect);
  }
}

function commitUseEffectEventMount(finishedWork) {
  var updateQueue = finishedWork.updateQueue;
  var eventPayloads = updateQueue !== null ? updateQueue.events : null;

  if (eventPayloads !== null) {
    for (var ii = 0; ii < eventPayloads.length; ii++) {
      var _eventPayloads$ii = eventPayloads[ii],
          ref = _eventPayloads$ii.ref,
          nextImpl = _eventPayloads$ii.nextImpl;
      ref.impl = nextImpl;
    }
  }
}

function commitPassiveEffectDurations(finishedRoot, finishedWork) {
  if ( getExecutionContext() & CommitContext) {
    // Only Profilers with work in their subtree will have an Update effect scheduled.
    if ((finishedWork.flags & Update) !== NoFlags) {
      switch (finishedWork.tag) {
        case Profiler:
          {
            var passiveEffectDuration = finishedWork.stateNode.passiveEffectDuration;
            var _finishedWork$memoize = finishedWork.memoizedProps,
                id = _finishedWork$memoize.id,
                onPostCommit = _finishedWork$memoize.onPostCommit; // This value will still reflect the previous commit phase.
            // It does not get reset until the start of the next commit phase.

            var commitTime = getCommitTime();
            var phase = finishedWork.alternate === null ? 'mount' : 'update';

            {
              if (isCurrentUpdateNested()) {
                phase = 'nested-update';
              }
            }

            if (typeof onPostCommit === 'function') {
              onPostCommit(id, phase, passiveEffectDuration, commitTime);
            } // Bubble times to the next nearest ancestor Profiler.
            // After we process that Profiler, we'll bubble further up.


            var parentFiber = finishedWork.return;

            outer: while (parentFiber !== null) {
              switch (parentFiber.tag) {
                case HostRoot:
                  var root = parentFiber.stateNode;
                  root.passiveEffectDuration += passiveEffectDuration;
                  break outer;

                case Profiler:
                  var parentStateNode = parentFiber.stateNode;
                  parentStateNode.passiveEffectDuration += passiveEffectDuration;
                  break outer;
              }

              parentFiber = parentFiber.return;
            }

            break;
          }
      }
    }
  }
}

function commitHookLayoutEffects(finishedWork, hookFlags) {
  // At this point layout effects have already been destroyed (during mutation phase).
  // This is done to prevent sibling component effects from interfering with each other,
  // e.g. a destroy function in one component should never override a ref set
  // by a create function in another component during the same commit.
  if (shouldProfile(finishedWork)) {
    try {
      startLayoutEffectTimer();
      commitHookEffectListMount(hookFlags, finishedWork);
    } catch (error) {
      captureCommitPhaseError(finishedWork, finishedWork.return, error);
    }

    recordLayoutEffectDuration(finishedWork);
  } else {
    try {
      commitHookEffectListMount(hookFlags, finishedWork);
    } catch (error) {
      captureCommitPhaseError(finishedWork, finishedWork.return, error);
    }
  }
}

function commitClassLayoutLifecycles(finishedWork, current) {
  var instance = finishedWork.stateNode;

  if (current === null) {

    if (shouldProfile(finishedWork)) {
      try {
        startLayoutEffectTimer();
        instance.componentDidMount();
      } catch (error) {
        captureCommitPhaseError(finishedWork, finishedWork.return, error);
      }

      recordLayoutEffectDuration(finishedWork);
    } else {
      try {
        instance.componentDidMount();
      } catch (error) {
        captureCommitPhaseError(finishedWork, finishedWork.return, error);
      }
    }
  } else {
    var prevProps = finishedWork.elementType === finishedWork.type ? current.memoizedProps : resolveDefaultProps(finishedWork.type, current.memoizedProps);
    var prevState = current.memoizedState; // We could update instance props and state here,

    if (shouldProfile(finishedWork)) {
      try {
        startLayoutEffectTimer();
        instance.componentDidUpdate(prevProps, prevState, instance.__reactInternalSnapshotBeforeUpdate);
      } catch (error) {
        captureCommitPhaseError(finishedWork, finishedWork.return, error);
      }

      recordLayoutEffectDuration(finishedWork);
    } else {
      try {
        instance.componentDidUpdate(prevProps, prevState, instance.__reactInternalSnapshotBeforeUpdate);
      } catch (error) {
        captureCommitPhaseError(finishedWork, finishedWork.return, error);
      }
    }
  }
}

function commitClassCallbacks(finishedWork) {
  // TODO: I think this is now always non-null by the time it reaches the
  // commit phase. Consider removing the type check.
  var updateQueue = finishedWork.updateQueue;

  if (updateQueue !== null) {
    var instance = finishedWork.stateNode;
    // but instead we rely on them being set during last render.
    // TODO: revisit this when we implement resuming.


    try {
      commitCallbacks(updateQueue, instance);
    } catch (error) {
      captureCommitPhaseError(finishedWork, finishedWork.return, error);
    }
  }
}

function commitHostComponentMount(finishedWork) {
  var type = finishedWork.type;
  var props = finishedWork.memoizedProps;
  var instance = finishedWork.stateNode;

  try {
    commitMount(instance, type, props, finishedWork);
  } catch (error) {
    captureCommitPhaseError(finishedWork, finishedWork.return, error);
  }
}

function commitProfilerUpdate(finishedWork, current) {
  if ( getExecutionContext() & CommitContext) {
    try {
      var _finishedWork$memoize2 = finishedWork.memoizedProps,
          onCommit = _finishedWork$memoize2.onCommit,
          onRender = _finishedWork$memoize2.onRender;
      var effectDuration = finishedWork.stateNode.effectDuration;
      var commitTime = getCommitTime();
      var phase = current === null ? 'mount' : 'update';

      if (enableProfilerNestedUpdatePhase) {
        if (isCurrentUpdateNested()) {
          phase = 'nested-update';
        }
      }

      if (typeof onRender === 'function') {
        onRender(finishedWork.memoizedProps.id, phase, finishedWork.actualDuration, finishedWork.treeBaseDuration, finishedWork.actualStartTime, commitTime);
      }

      if (enableProfilerCommitHooks) {
        if (typeof onCommit === 'function') {
          onCommit(finishedWork.memoizedProps.id, phase, effectDuration, commitTime);
        } // Schedule a passive effect for this Profiler to call onPostCommit hooks.
        // This effect should be scheduled even if there is no onPostCommit callback for this Profiler,
        // because the effect is also where times bubble to parent Profilers.


        enqueuePendingPassiveProfilerEffect(finishedWork); // Propagate layout effect durations to the next nearest Profiler ancestor.
        // Do not reset these values until the next render so DevTools has a chance to read them first.

        var parentFiber = finishedWork.return;

        outer: while (parentFiber !== null) {
          switch (parentFiber.tag) {
            case HostRoot:
              var root = parentFiber.stateNode;
              root.effectDuration += effectDuration;
              break outer;

            case Profiler:
              var parentStateNode = parentFiber.stateNode;
              parentStateNode.effectDuration += effectDuration;
              break outer;
          }

          parentFiber = parentFiber.return;
        }
      }
    } catch (error) {
      captureCommitPhaseError(finishedWork, finishedWork.return, error);
    }
  }
}

function commitLayoutEffectOnFiber(finishedRoot, current, finishedWork, committedLanes) {
  // When updating this function, also update reappearLayoutEffects, which does
  // most of the same things when an offscreen tree goes from hidden -> visible.
  var flags = finishedWork.flags;

  switch (finishedWork.tag) {
    case FunctionComponent:
    case ForwardRef:
    case SimpleMemoComponent:
      {
        recursivelyTraverseLayoutEffects(finishedRoot, finishedWork);

        if (flags & Update) {
          commitHookLayoutEffects(finishedWork, Layout | HasEffect);
        }

        break;
      }

    case ClassComponent:
      {
        recursivelyTraverseLayoutEffects(finishedRoot, finishedWork);

        if (flags & Update) {
          commitClassLayoutLifecycles(finishedWork, current);
        }

        if (flags & Callback) {
          commitClassCallbacks(finishedWork);
        }

        if (flags & Ref) {
          safelyAttachRef(finishedWork, finishedWork.return);
        }

        break;
      }

    case HostRoot:
      {
        recursivelyTraverseLayoutEffects(finishedRoot, finishedWork);

        if (flags & Callback) {
          // TODO: I think this is now always non-null by the time it reaches the
          // commit phase. Consider removing the type check.
          var updateQueue = finishedWork.updateQueue;

          if (updateQueue !== null) {
            var instance = null;

            if (finishedWork.child !== null) {
              switch (finishedWork.child.tag) {
                case HostSingleton:
                case HostComponent:
                  instance = getPublicInstance(finishedWork.child.stateNode);
                  break;

                case ClassComponent:
                  instance = finishedWork.child.stateNode;
                  break;
              }
            }

            try {
              commitCallbacks(updateQueue, instance);
            } catch (error) {
              captureCommitPhaseError(finishedWork, finishedWork.return, error);
            }
          }
        }

        break;
      }

    case HostResource:
      {
        if ( supportsResources) {
          recursivelyTraverseLayoutEffects(finishedRoot, finishedWork);

          if (flags & Ref) {
            safelyAttachRef(finishedWork, finishedWork.return);
          }

          break;
        }
      }
    // eslint-disable-next-line-no-fallthrough

    case HostSingleton:
    case HostComponent:
      {
        recursivelyTraverseLayoutEffects(finishedRoot, finishedWork); // Renderers may schedule work to be done after host components are mounted
        // (eg DOM renderer may schedule auto-focus for inputs and form controls).
        // These effects should only be committed when components are first mounted,
        // aka when there is no current/alternate.

        if (current === null && flags & Update) {
          commitHostComponentMount(finishedWork);
        }

        if (flags & Ref) {
          safelyAttachRef(finishedWork, finishedWork.return);
        }

        break;
      }

    case Profiler:
      {
        recursivelyTraverseLayoutEffects(finishedRoot, finishedWork); // TODO: Should this fire inside an offscreen tree? Or should it wait to
        // fire when the tree becomes visible again.

        if (flags & Update) {
          commitProfilerUpdate(finishedWork, current);
        }

        break;
      }

    case SuspenseComponent:
      {
        recursivelyTraverseLayoutEffects(finishedRoot, finishedWork);

        if (flags & Update) {
          commitSuspenseHydrationCallbacks(finishedRoot, finishedWork);
        }

        break;
      }

    case OffscreenComponent:
      {
        var isModernRoot = (finishedWork.mode & ConcurrentMode) !== NoMode;

        if (isModernRoot) {
          var isHidden = finishedWork.memoizedState !== null;
          var newOffscreenSubtreeIsHidden = isHidden || offscreenSubtreeIsHidden;

          if (newOffscreenSubtreeIsHidden) ; else {
            // The Offscreen tree is visible.
            var wasHidden = current !== null && current.memoizedState !== null;
            var newOffscreenSubtreeWasHidden = wasHidden || offscreenSubtreeWasHidden;
            var prevOffscreenSubtreeIsHidden = offscreenSubtreeIsHidden;
            var prevOffscreenSubtreeWasHidden = offscreenSubtreeWasHidden;
            offscreenSubtreeIsHidden = newOffscreenSubtreeIsHidden;
            offscreenSubtreeWasHidden = newOffscreenSubtreeWasHidden;

            if (offscreenSubtreeWasHidden && !prevOffscreenSubtreeWasHidden) {
              // This is the root of a reappearing boundary. As we continue
              // traversing the layout effects, we must also re-mount layout
              // effects that were unmounted when the Offscreen subtree was
              // hidden. So this is a superset of the normal commitLayoutEffects.
              var includeWorkInProgressEffects = (finishedWork.subtreeFlags & LayoutMask) !== NoFlags;
              recursivelyTraverseReappearLayoutEffects(finishedRoot, finishedWork, includeWorkInProgressEffects);
            } else {
              recursivelyTraverseLayoutEffects(finishedRoot, finishedWork);
            }

            offscreenSubtreeIsHidden = prevOffscreenSubtreeIsHidden;
            offscreenSubtreeWasHidden = prevOffscreenSubtreeWasHidden;
          }
        } else {
          recursivelyTraverseLayoutEffects(finishedRoot, finishedWork);
        }

        if (flags & Ref) {
          var props = finishedWork.memoizedProps;

          if (props.mode === 'manual') {
            safelyAttachRef(finishedWork, finishedWork.return);
          } else {
            safelyDetachRef(finishedWork, finishedWork.return);
          }
        }

        break;
      }

    default:
      {
        recursivelyTraverseLayoutEffects(finishedRoot, finishedWork);
        break;
      }
  }
}

function hideOrUnhideAllChildren(finishedWork, isHidden) {
  // Only hide or unhide the top-most host nodes.
  var hostSubtreeRoot = null;

  if (supportsMutation) {
    // We only have the top Fiber that was inserted but we need to recurse down its
    // children to find all the terminal nodes.
    var node = finishedWork;

    while (true) {
      if (node.tag === HostComponent || ( supportsResources ? node.tag === HostResource : false) || ( supportsSingletons ? node.tag === HostSingleton : false)) {
        if (hostSubtreeRoot === null) {
          hostSubtreeRoot = node;

          try {
            var instance = node.stateNode;

            if (isHidden) {
              hideInstance(instance);
            } else {
              unhideInstance(node.stateNode, node.memoizedProps);
            }
          } catch (error) {
            captureCommitPhaseError(finishedWork, finishedWork.return, error);
          }
        }
      } else if (node.tag === HostText) {
        if (hostSubtreeRoot === null) {
          try {
            var _instance = node.stateNode;

            if (isHidden) {
              hideTextInstance(_instance);
            } else {
              unhideTextInstance(_instance, node.memoizedProps);
            }
          } catch (error) {
            captureCommitPhaseError(finishedWork, finishedWork.return, error);
          }
        }
      } else if ((node.tag === OffscreenComponent || node.tag === LegacyHiddenComponent) && node.memoizedState !== null && node !== finishedWork) ; else if (node.child !== null) {
        node.child.return = node;
        node = node.child;
        continue;
      }

      if (node === finishedWork) {
        return;
      }

      while (node.sibling === null) {
        if (node.return === null || node.return === finishedWork) {
          return;
        }

        if (hostSubtreeRoot === node) {
          hostSubtreeRoot = null;
        }

        node = node.return;
      }

      if (hostSubtreeRoot === node) {
        hostSubtreeRoot = null;
      }

      node.sibling.return = node.return;
      node = node.sibling;
    }
  }
}

function commitAttachRef(finishedWork) {
  var ref = finishedWork.ref;

  if (ref !== null) {
    var instance = finishedWork.stateNode;
    var instanceToUse;

    switch (finishedWork.tag) {
      case HostResource:
      case HostSingleton:
      case HostComponent:
        instanceToUse = getPublicInstance(instance);
        break;

      default:
        instanceToUse = instance;
    } // Moved outside to ensure DCE works with this flag

    if (typeof ref === 'function') {
      if (shouldProfile(finishedWork)) {
        try {
          startLayoutEffectTimer();
          finishedWork.refCleanup = ref(instanceToUse);
        } finally {
          recordLayoutEffectDuration(finishedWork);
        }
      } else {
        finishedWork.refCleanup = ref(instanceToUse);
      }
    } else {


      ref.current = instanceToUse;
    }
  }
}

function detachFiberMutation(fiber) {
  // Cut off the return pointer to disconnect it from the tree.
  // This enables us to detect and warn against state updates on an unmounted component.
  // It also prevents events from bubbling from within disconnected components.
  //
  // Ideally, we should also clear the child pointer of the parent alternate to let this
  // get GC:ed but we don't know which for sure which parent is the current
  // one so we'll settle for GC:ing the subtree of this child.
  // This child itself will be GC:ed when the parent updates the next time.
  //
  // Note that we can't clear child or sibling pointers yet.
  // They're needed for passive effects and for findDOMNode.
  // We defer those fields, and all other cleanup, to the passive phase (see detachFiberAfterEffects).
  //
  // Don't reset the alternate yet, either. We need that so we can detach the
  // alternate's fields in the passive phase. Clearing the return pointer is
  // sufficient for findDOMNode semantics.
  var alternate = fiber.alternate;

  if (alternate !== null) {
    alternate.return = null;
  }

  fiber.return = null;
}

function detachFiberAfterEffects(fiber) {
  var alternate = fiber.alternate;

  if (alternate !== null) {
    fiber.alternate = null;
    detachFiberAfterEffects(alternate);
  } // Note: Defensively using negation instead of < in case
  // `deletedTreeCleanUpLevel` is undefined.


  {
    // Clear cyclical Fiber fields. This level alone is designed to roughly
    // approximate the planned Fiber refactor. In that world, `setState` will be
    // bound to a special "instance" object instead of a Fiber. The Instance
    // object will not have any of these fields. It will only be connected to
    // the fiber tree via a single link at the root. So if this level alone is
    // sufficient to fix memory issues, that bodes well for our plans.
    fiber.child = null;
    fiber.deletions = null;
    fiber.sibling = null; // The `stateNode` is cyclical because on host nodes it points to the host
    // tree, which has its own pointers to children, parents, and siblings.
    // The other host nodes also point back to fibers, so we should detach that
    // one, too.

    if (fiber.tag === HostComponent) {
      var hostInstance = fiber.stateNode;

      if (hostInstance !== null) {
        detachDeletedInstance(hostInstance);
      }
    }

    fiber.stateNode = null; // I'm intentionally not clearing the `return` field in this level. We

    {
      // Theoretically, nothing in here should be necessary, because we already
      // disconnected the fiber from the tree. So even if something leaks this
      // particular fiber, it won't leak anything else
      //
      // The purpose of this branch is to be super aggressive so we can measure
      // if there's any difference in memory impact. If there is, that could
      // indicate a React leak we don't know about.
      fiber.return = null;
      fiber.dependencies = null;
      fiber.memoizedProps = null;
      fiber.memoizedState = null;
      fiber.pendingProps = null;
      fiber.stateNode = null; // TODO: Move to `commitPassiveUnmountInsideDeletedTreeOnFiber` instead.

      fiber.updateQueue = null;
    }
  }
}

function emptyPortalContainer(current) {
  if (!supportsPersistence) {
    return;
  }

  var portal = current.stateNode;
  var containerInfo = portal.containerInfo;
  var emptyChildSet = createContainerChildSet(containerInfo);
  replaceContainerChildren(containerInfo, emptyChildSet);
}

function getHostParentFiber(fiber) {
  var parent = fiber.return;

  while (parent !== null) {
    if (isHostParent(parent)) {
      return parent;
    }

    parent = parent.return;
  }

  throw new Error('Expected to find a host parent. This error is likely caused by a bug ' + 'in React. Please file an issue.');
}

function isHostParent(fiber) {
  return fiber.tag === HostComponent || fiber.tag === HostRoot || ( supportsResources ? fiber.tag === HostResource : false) || ( supportsSingletons ? fiber.tag === HostSingleton : false) || fiber.tag === HostPortal;
}

function getHostSibling(fiber) {
  // We're going to search forward into the tree until we find a sibling host
  // node. Unfortunately, if multiple insertions are done in a row we have to
  // search past them. This leads to exponential search for the next sibling.
  // TODO: Find a more efficient way to do this.
  var node = fiber;

  siblings: while (true) {
    // If we didn't find anything, let's try the next sibling.
    while (node.sibling === null) {
      if (node.return === null || isHostParent(node.return)) {
        // If we pop out of the root or hit the parent the fiber we are the
        // last sibling.
        return null;
      } // $FlowFixMe[incompatible-type] found when upgrading Flow


      node = node.return;
    }

    node.sibling.return = node.return;
    node = node.sibling;

    while (node.tag !== HostComponent && node.tag !== HostText && (!( supportsSingletons) ? true : node.tag !== HostSingleton) && node.tag !== DehydratedFragment) {
      // If it is not host node and, we might have a host node inside it.
      // Try to search down until we find one.
      if (node.flags & Placement) {
        // If we don't have a child, try the siblings instead.
        continue siblings;
      } // If we don't have a child, try the siblings instead.
      // We also skip portals because they are not part of this host tree.


      if (node.child === null || node.tag === HostPortal) {
        continue siblings;
      } else {
        node.child.return = node;
        node = node.child;
      }
    } // Check if this host node is stable or about to be placed.


    if (!(node.flags & Placement)) {
      // Found it!
      return node.stateNode;
    }
  }
}

function commitPlacement(finishedWork) {
  if (!supportsMutation) {
    return;
  }

  if ( supportsSingletons) {
    if (finishedWork.tag === HostSingleton) {
      // Singletons are already in the Host and don't need to be placed
      // Since they operate somewhat like Portals though their children will
      // have Placement and will get placed inside them
      return;
    }
  } // Recursively insert all host nodes into the parent.


  var parentFiber = getHostParentFiber(finishedWork);

  switch (parentFiber.tag) {
    case HostSingleton:
      {
        if ( supportsSingletons) {
          var parent = parentFiber.stateNode;
          var before = getHostSibling(finishedWork); // We only have the top Fiber that was inserted but we need to recurse down its
          // children to find all the terminal nodes.

          insertOrAppendPlacementNode(finishedWork, before, parent);
          break;
        }
      }
    // eslint-disable-next-line no-fallthrough

    case HostComponent:
      {
        var _parent = parentFiber.stateNode;

        if (parentFiber.flags & ContentReset) {
          // Reset the text content of the parent before doing any insertions
          resetTextContent(_parent); // Clear ContentReset from the effect tag

          parentFiber.flags &= ~ContentReset;
        }

        var _before = getHostSibling(finishedWork); // We only have the top Fiber that was inserted but we need to recurse down its
        // children to find all the terminal nodes.


        insertOrAppendPlacementNode(finishedWork, _before, _parent);
        break;
      }

    case HostRoot:
    case HostPortal:
      {
        var _parent2 = parentFiber.stateNode.containerInfo;

        var _before2 = getHostSibling(finishedWork);

        insertOrAppendPlacementNodeIntoContainer(finishedWork, _before2, _parent2);
        break;
      }
    // eslint-disable-next-line-no-fallthrough

    default:
      throw new Error('Invalid host parent fiber. This error is likely caused by a bug ' + 'in React. Please file an issue.');
  }
}

function insertOrAppendPlacementNodeIntoContainer(node, before, parent) {
  var tag = node.tag;
  var isHost = tag === HostComponent || tag === HostText;

  if (isHost) {
    var stateNode = node.stateNode;

    if (before) {
      insertInContainerBefore(parent, stateNode, before);
    } else {
      appendChildToContainer(parent, stateNode);
    }
  } else if (tag === HostPortal || ( supportsSingletons ? tag === HostSingleton : false)) ; else {
    var child = node.child;

    if (child !== null) {
      insertOrAppendPlacementNodeIntoContainer(child, before, parent);
      var sibling = child.sibling;

      while (sibling !== null) {
        insertOrAppendPlacementNodeIntoContainer(sibling, before, parent);
        sibling = sibling.sibling;
      }
    }
  }
}

function insertOrAppendPlacementNode(node, before, parent) {
  var tag = node.tag;
  var isHost = tag === HostComponent || tag === HostText;

  if (isHost) {
    var stateNode = node.stateNode;

    if (before) {
      insertBefore(parent, stateNode, before);
    } else {
      appendChild(parent, stateNode);
    }
  } else if (tag === HostPortal || ( supportsSingletons ? tag === HostSingleton : false)) ; else {
    var child = node.child;

    if (child !== null) {
      insertOrAppendPlacementNode(child, before, parent);
      var sibling = child.sibling;

      while (sibling !== null) {
        insertOrAppendPlacementNode(sibling, before, parent);
        sibling = sibling.sibling;
      }
    }
  }
} // These are tracked on the stack as we recursively traverse a
// deleted subtree.
// TODO: Update these during the whole mutation phase, not just during
// a deletion.


var hostParent = null;
var hostParentIsContainer = false;

function commitDeletionEffects(root, returnFiber, deletedFiber) {
  if (supportsMutation) {
    // We only have the top Fiber that was deleted but we need to recurse down its
    // children to find all the terminal nodes.
    // Recursively delete all host nodes from the parent, detach refs, clean
    // up mounted layout effects, and call componentWillUnmount.
    // We only need to remove the topmost host child in each branch. But then we
    // still need to keep traversing to unmount effects, refs, and cWU. TODO: We
    // could split this into two separate traversals functions, where the second
    // one doesn't include any removeChild logic. This is maybe the same
    // function as "disappearLayoutEffects" (or whatever that turns into after
    // the layout phase is refactored to use recursion).
    // Before starting, find the nearest host parent on the stack so we know
    // which instance/container to remove the children from.
    // TODO: Instead of searching up the fiber return path on every deletion, we
    // can track the nearest host component on the JS stack as we traverse the
    // tree during the commit phase. This would make insertions faster, too.
    var parent = returnFiber;

    findParent: while (parent !== null) {
      switch (parent.tag) {
        case HostSingleton:
        case HostComponent:
          {
            hostParent = parent.stateNode;
            hostParentIsContainer = false;
            break findParent;
          }

        case HostRoot:
          {
            hostParent = parent.stateNode.containerInfo;
            hostParentIsContainer = true;
            break findParent;
          }

        case HostPortal:
          {
            hostParent = parent.stateNode.containerInfo;
            hostParentIsContainer = true;
            break findParent;
          }
      }

      parent = parent.return;
    }

    if (hostParent === null) {
      throw new Error('Expected to find a host parent. This error is likely caused by ' + 'a bug in React. Please file an issue.');
    }

    commitDeletionEffectsOnFiber(root, returnFiber, deletedFiber);
    hostParent = null;
    hostParentIsContainer = false;
  } else {
    // Detach refs and call componentWillUnmount() on the whole subtree.
    commitDeletionEffectsOnFiber(root, returnFiber, deletedFiber);
  }

  detachFiberMutation(deletedFiber);
}

function recursivelyTraverseDeletionEffects(finishedRoot, nearestMountedAncestor, parent) {
  // TODO: Use a static flag to skip trees that don't have unmount effects
  var child = parent.child;

  while (child !== null) {
    commitDeletionEffectsOnFiber(finishedRoot, nearestMountedAncestor, child);
    child = child.sibling;
  }
}

function commitDeletionEffectsOnFiber(finishedRoot, nearestMountedAncestor, deletedFiber) {
  onCommitUnmount(deletedFiber); // The cases in this outer switch modify the stack before they traverse
  // into their subtree. There are simpler cases in the inner switch
  // that don't modify the stack.

  switch (deletedFiber.tag) {
    case HostResource:
      {
        if ( supportsResources) {
          if (!offscreenSubtreeWasHidden) {
            safelyDetachRef(deletedFiber, nearestMountedAncestor);
          }

          recursivelyTraverseDeletionEffects(finishedRoot, nearestMountedAncestor, deletedFiber);

          if (deletedFiber.memoizedState) {
            releaseResource(deletedFiber.memoizedState);
          }

          return;
        }
      }
    // eslint-disable-next-line no-fallthrough

    case HostSingleton:
      {
        if ( supportsSingletons) {
          if (!offscreenSubtreeWasHidden) {
            safelyDetachRef(deletedFiber, nearestMountedAncestor);
          }

          var prevHostParent = hostParent;
          var prevHostParentIsContainer = hostParentIsContainer;
          hostParent = deletedFiber.stateNode;
          recursivelyTraverseDeletionEffects(finishedRoot, nearestMountedAncestor, deletedFiber); // Normally this is called in passive unmount effect phase however with
          // HostSingleton we warn if you acquire one that is already associated to
          // a different fiber. To increase our chances of avoiding this, specifically
          // if you keyed a HostSingleton so there will be a delete followed by a Placement
          // we treat detach eagerly here

          releaseSingletonInstance(deletedFiber.stateNode);
          hostParent = prevHostParent;
          hostParentIsContainer = prevHostParentIsContainer;
          return;
        }
      }
    // eslint-disable-next-line no-fallthrough

    case HostComponent:
      {
        if (!offscreenSubtreeWasHidden) {
          safelyDetachRef(deletedFiber, nearestMountedAncestor);
        } // Intentional fallthrough to next branch

      }
    // eslint-disable-next-line-no-fallthrough

    case HostText:
      {
        // We only need to remove the nearest host child. Set the host parent
        // to `null` on the stack to indicate that nested children don't
        // need to be removed.
        if (supportsMutation) {
          var _prevHostParent = hostParent;
          var _prevHostParentIsContainer = hostParentIsContainer;
          hostParent = null;
          recursivelyTraverseDeletionEffects(finishedRoot, nearestMountedAncestor, deletedFiber);
          hostParent = _prevHostParent;
          hostParentIsContainer = _prevHostParentIsContainer;

          if (hostParent !== null) {
            // Now that all the child effects have unmounted, we can remove the
            // node from the tree.
            if (hostParentIsContainer) {
              removeChildFromContainer(hostParent, deletedFiber.stateNode);
            } else {
              removeChild(hostParent, deletedFiber.stateNode);
            }
          }
        } else {
          recursivelyTraverseDeletionEffects(finishedRoot, nearestMountedAncestor, deletedFiber);
        }

        return;
      }

    case DehydratedFragment:
      {
        // Delete the dehydrated suspense boundary and all of its content.


        if (supportsMutation) {
          if (hostParent !== null) {
            if (hostParentIsContainer) {
              clearSuspenseBoundaryFromContainer(hostParent, deletedFiber.stateNode);
            } else {
              clearSuspenseBoundary(hostParent, deletedFiber.stateNode);
            }
          }
        }

        return;
      }

    case HostPortal:
      {
        if (supportsMutation) {
          // When we go into a portal, it becomes the parent to remove from.
          var _prevHostParent2 = hostParent;
          var _prevHostParentIsContainer2 = hostParentIsContainer;
          hostParent = deletedFiber.stateNode.containerInfo;
          hostParentIsContainer = true;
          recursivelyTraverseDeletionEffects(finishedRoot, nearestMountedAncestor, deletedFiber);
          hostParent = _prevHostParent2;
          hostParentIsContainer = _prevHostParentIsContainer2;
        } else {
          emptyPortalContainer(deletedFiber);
          recursivelyTraverseDeletionEffects(finishedRoot, nearestMountedAncestor, deletedFiber);
        }

        return;
      }

    case FunctionComponent:
    case ForwardRef:
    case MemoComponent:
    case SimpleMemoComponent:
      {
        if (!offscreenSubtreeWasHidden) {
          var updateQueue = deletedFiber.updateQueue;

          if (updateQueue !== null) {
            var lastEffect = updateQueue.lastEffect;

            if (lastEffect !== null) {
              var firstEffect = lastEffect.next;
              var effect = firstEffect;

              do {
                var _effect = effect,
                    destroy = _effect.destroy,
                    tag = _effect.tag;

                if (destroy !== undefined) {
                  if ((tag & Insertion) !== NoFlags$1) {
                    safelyCallDestroy(deletedFiber, nearestMountedAncestor, destroy);
                  } else if ((tag & Layout) !== NoFlags$1) {
                    {
                      markComponentLayoutEffectUnmountStarted(deletedFiber);
                    }

                    if (shouldProfile(deletedFiber)) {
                      startLayoutEffectTimer();
                      safelyCallDestroy(deletedFiber, nearestMountedAncestor, destroy);
                      recordLayoutEffectDuration(deletedFiber);
                    } else {
                      safelyCallDestroy(deletedFiber, nearestMountedAncestor, destroy);
                    }

                    {
                      markComponentLayoutEffectUnmountStopped();
                    }
                  }
                }

                effect = effect.next;
              } while (effect !== firstEffect);
            }
          }
        }

        recursivelyTraverseDeletionEffects(finishedRoot, nearestMountedAncestor, deletedFiber);
        return;
      }

    case ClassComponent:
      {
        if (!offscreenSubtreeWasHidden) {
          safelyDetachRef(deletedFiber, nearestMountedAncestor);
          var instance = deletedFiber.stateNode;

          if (typeof instance.componentWillUnmount === 'function') {
            safelyCallComponentWillUnmount(deletedFiber, nearestMountedAncestor, instance);
          }
        }

        recursivelyTraverseDeletionEffects(finishedRoot, nearestMountedAncestor, deletedFiber);
        return;
      }

    case ScopeComponent:
      {

        recursivelyTraverseDeletionEffects(finishedRoot, nearestMountedAncestor, deletedFiber);
        return;
      }

    case OffscreenComponent:
      {
        safelyDetachRef(deletedFiber, nearestMountedAncestor);

        if (deletedFiber.mode & ConcurrentMode) {
          // If this offscreen component is hidden, we already unmounted it. Before
          // deleting the children, track that it's already unmounted so that we
          // don't attempt to unmount the effects again.
          // TODO: If the tree is hidden, in most cases we should be able to skip
          // over the nested children entirely. An exception is we haven't yet found
          // the topmost host node to delete, which we already track on the stack.
          // But the other case is portals, which need to be detached no matter how
          // deeply they are nested. We should use a subtree flag to track whether a
          // subtree includes a nested portal.
          var prevOffscreenSubtreeWasHidden = offscreenSubtreeWasHidden;
          offscreenSubtreeWasHidden = prevOffscreenSubtreeWasHidden || deletedFiber.memoizedState !== null;
          recursivelyTraverseDeletionEffects(finishedRoot, nearestMountedAncestor, deletedFiber);
          offscreenSubtreeWasHidden = prevOffscreenSubtreeWasHidden;
        } else {
          recursivelyTraverseDeletionEffects(finishedRoot, nearestMountedAncestor, deletedFiber);
        }

        break;
      }

    default:
      {
        recursivelyTraverseDeletionEffects(finishedRoot, nearestMountedAncestor, deletedFiber);
        return;
      }
  }
}

function commitSuspenseCallback(finishedWork) {
  // TODO: Move this to passive phase
  var newState = finishedWork.memoizedState;
}

function commitSuspenseHydrationCallbacks(finishedRoot, finishedWork) {
  if (!supportsHydration) {
    return;
  }

  var newState = finishedWork.memoizedState;

  if (newState === null) {
    var current = finishedWork.alternate;

    if (current !== null) {
      var prevState = current.memoizedState;

      if (prevState !== null) {
        var suspenseInstance = prevState.dehydrated;

        if (suspenseInstance !== null) {
          try {
            commitHydratedSuspenseInstance(suspenseInstance);

            if (enableSuspenseCallback) {
              var hydrationCallbacks = finishedRoot.hydrationCallbacks;

              if (hydrationCallbacks !== null) {
                var onHydrated = hydrationCallbacks.onHydrated;

                if (onHydrated) {
                  onHydrated(suspenseInstance);
                }
              }
            }
          } catch (error) {
            captureCommitPhaseError(finishedWork, finishedWork.return, error);
          }
        }
      }
    }
  }
}

function getRetryCache(finishedWork) {
  // TODO: Unify the interface for the retry cache so we don't have to switch
  // on the tag like this.
  switch (finishedWork.tag) {
    case SuspenseComponent:
    case SuspenseListComponent:
      {
        var retryCache = finishedWork.stateNode;

        if (retryCache === null) {
          retryCache = finishedWork.stateNode = new PossiblyWeakSet();
        }

        return retryCache;
      }

    case OffscreenComponent:
      {
        var instance = finishedWork.stateNode; // $FlowFixMe[incompatible-type-arg] found when upgrading Flow

        var _retryCache = // $FlowFixMe[incompatible-type] found when upgrading Flow
        instance._retryCache;

        if (_retryCache === null) {
          // $FlowFixMe[incompatible-type]
          _retryCache = instance._retryCache = new PossiblyWeakSet();
        }

        return _retryCache;
      }

    default:
      {
        throw new Error("Unexpected Suspense handler tag (" + finishedWork.tag + "). This is a " + 'bug in React.');
      }
  }
}

function detachOffscreenInstance(instance) {
  var fiber = instance._current;

  if (fiber === null) {
    throw new Error('Calling Offscreen.detach before instance handle has been set.');
  }

  if ((instance._pendingVisibility & OffscreenDetached) !== NoFlags) {
    // The instance is already detached, this is a noop.
    return;
  } // TODO: There is an opportunity to optimise this by not entering commit phase
  // and unmounting effects directly.


  var root = enqueueConcurrentRenderForLane(fiber, SyncLane);

  if (root !== null) {
    instance._pendingVisibility |= OffscreenDetached;
    scheduleUpdateOnFiber(root, fiber, SyncLane, NoTimestamp);
  }
}
function attachOffscreenInstance(instance) {
  var fiber = instance._current;

  if (fiber === null) {
    throw new Error('Calling Offscreen.detach before instance handle has been set.');
  }

  if ((instance._pendingVisibility & OffscreenDetached) === NoFlags) {
    // The instance is already attached, this is a noop.
    return;
  }

  var root = enqueueConcurrentRenderForLane(fiber, SyncLane);

  if (root !== null) {
    instance._pendingVisibility &= ~OffscreenDetached;
    scheduleUpdateOnFiber(root, fiber, SyncLane, NoTimestamp);
  }
}

function attachSuspenseRetryListeners(finishedWork, wakeables) {
  // If this boundary just timed out, then it will have a set of wakeables.
  // For each wakeable, attach a listener so that when it resolves, React
  // attempts to re-render the boundary in the primary (pre-timeout) state.
  var retryCache = getRetryCache(finishedWork);
  wakeables.forEach(function (wakeable) {
    // Memoize using the boundary fiber to prevent redundant listeners.
    var retry = resolveRetryWakeable.bind(null, finishedWork, wakeable);

    if (!retryCache.has(wakeable)) {
      retryCache.add(wakeable);

      {
        if (isDevToolsPresent) {
          if (inProgressLanes !== null && inProgressRoot !== null) {
            // If we have pending work still, associate the original updaters with it.
            restorePendingUpdaters(inProgressRoot, inProgressLanes);
          } else {
            throw Error('Expected finished root and lanes to be set. This is a bug in React.');
          }
        }
      }

      wakeable.then(retry, retry);
    }
  });
} // This function detects when a Suspense boundary goes from visible to hidden.
function commitMutationEffects(root, finishedWork, committedLanes) {
  inProgressLanes = committedLanes;
  inProgressRoot = root;
  commitMutationEffectsOnFiber(finishedWork, root);
  inProgressLanes = null;
  inProgressRoot = null;
}

function recursivelyTraverseMutationEffects(root, parentFiber, lanes) {
  // Deletions effects can be scheduled on any fiber type. They need to happen
  // before the children effects hae fired.
  var deletions = parentFiber.deletions;

  if (deletions !== null) {
    for (var i = 0; i < deletions.length; i++) {
      var childToDelete = deletions[i];

      try {
        commitDeletionEffects(root, parentFiber, childToDelete);
      } catch (error) {
        captureCommitPhaseError(childToDelete, parentFiber, error);
      }
    }
  }

  if (parentFiber.subtreeFlags & MutationMask) {
    var child = parentFiber.child;

    while (child !== null) {
      commitMutationEffectsOnFiber(child, root);
      child = child.sibling;
    }
  }
}

function commitMutationEffectsOnFiber(finishedWork, root, lanes) {
  var current = finishedWork.alternate;
  var flags = finishedWork.flags; // The effect flag should be checked *after* we refine the type of fiber,
  // because the fiber tag is more specific. An exception is any flag related
  // to reconciliation, because those can be set on all fiber types.

  switch (finishedWork.tag) {
    case FunctionComponent:
    case ForwardRef:
    case MemoComponent:
    case SimpleMemoComponent:
      {
        recursivelyTraverseMutationEffects(root, finishedWork);
        commitReconciliationEffects(finishedWork);

        if (flags & Update) {
          try {
            commitHookEffectListUnmount(Insertion | HasEffect, finishedWork, finishedWork.return);
            commitHookEffectListMount(Insertion | HasEffect, finishedWork);
          } catch (error) {
            captureCommitPhaseError(finishedWork, finishedWork.return, error);
          } // Layout effects are destroyed during the mutation phase so that all
          // destroy functions for all fibers are called before any create functions.
          // This prevents sibling component effects from interfering with each other,
          // e.g. a destroy function in one component should never override a ref set
          // by a create function in another component during the same commit.


          if (shouldProfile(finishedWork)) {
            try {
              startLayoutEffectTimer();
              commitHookEffectListUnmount(Layout | HasEffect, finishedWork, finishedWork.return);
            } catch (error) {
              captureCommitPhaseError(finishedWork, finishedWork.return, error);
            }

            recordLayoutEffectDuration(finishedWork);
          } else {
            try {
              commitHookEffectListUnmount(Layout | HasEffect, finishedWork, finishedWork.return);
            } catch (error) {
              captureCommitPhaseError(finishedWork, finishedWork.return, error);
            }
          }
        }

        return;
      }

    case ClassComponent:
      {
        recursivelyTraverseMutationEffects(root, finishedWork);
        commitReconciliationEffects(finishedWork);

        if (flags & Ref) {
          if (current !== null) {
            safelyDetachRef(current, current.return);
          }
        }

        if (flags & Callback && offscreenSubtreeIsHidden) {
          var updateQueue = finishedWork.updateQueue;

          if (updateQueue !== null) {
            deferHiddenCallbacks(updateQueue);
          }
        }

        return;
      }

    case HostResource:
      {
        if ( supportsResources) {
          recursivelyTraverseMutationEffects(root, finishedWork);
          commitReconciliationEffects(finishedWork);

          if (flags & Ref) {
            if (current !== null) {
              safelyDetachRef(current, current.return);
            }
          }

          if (flags & Update) {
            var newResource = finishedWork.memoizedState;

            if (current !== null) {
              var currentResource = current.memoizedState;

              if (currentResource !== newResource) {
                releaseResource(currentResource);
              }
            }

            finishedWork.stateNode = newResource ? acquireResource(newResource) : null;
          }

          return;
        }
      }
    // eslint-disable-next-line-no-fallthrough

    case HostSingleton:
      {
        if ( supportsSingletons) {
          if (flags & Update) {
            var previousWork = finishedWork.alternate;

            if (previousWork === null) {
              var singleton = finishedWork.stateNode;
              var props = finishedWork.memoizedProps; // This was a new mount, we need to clear and set initial properties

              clearSingleton(singleton);
              acquireSingletonInstance(finishedWork.type, props, singleton, finishedWork);
            }
          }
        }
      }
    // eslint-disable-next-line-no-fallthrough

    case HostComponent:
      {
        recursivelyTraverseMutationEffects(root, finishedWork);
        commitReconciliationEffects(finishedWork);

        if (flags & Ref) {
          if (current !== null) {
            safelyDetachRef(current, current.return);
          }
        }

        if (supportsMutation) {
          // TODO: ContentReset gets cleared by the children during the commit
          // phase. This is a refactor hazard because it means we must read
          // flags the flags after `commitReconciliationEffects` has already run;
          // the order matters. We should refactor so that ContentReset does not
          // rely on mutating the flag during commit. Like by setting a flag
          // during the render phase instead.
          if (finishedWork.flags & ContentReset) {
            var instance = finishedWork.stateNode;

            try {
              resetTextContent(instance);
            } catch (error) {
              captureCommitPhaseError(finishedWork, finishedWork.return, error);
            }
          }

          if (flags & Update) {
            var _instance2 = finishedWork.stateNode;

            if (_instance2 != null) {
              // Commit the work prepared earlier.
              var newProps = finishedWork.memoizedProps; // For hydration we reuse the update path but we treat the oldProps
              // as the newProps. The updatePayload will contain the real change in
              // this case.

              var oldProps = current !== null ? current.memoizedProps : newProps;
              var type = finishedWork.type; // TODO: Type the updateQueue to be specific to host components.

              var updatePayload = finishedWork.updateQueue;
              finishedWork.updateQueue = null;

              if (updatePayload !== null) {
                try {
                  commitUpdate(_instance2, updatePayload, type, oldProps, newProps, finishedWork);
                } catch (error) {
                  captureCommitPhaseError(finishedWork, finishedWork.return, error);
                }
              }
            }
          }
        }

        return;
      }

    case HostText:
      {
        recursivelyTraverseMutationEffects(root, finishedWork);
        commitReconciliationEffects(finishedWork);

        if (flags & Update) {
          if (supportsMutation) {
            if (finishedWork.stateNode === null) {
              throw new Error('This should have a text node initialized. This error is likely ' + 'caused by a bug in React. Please file an issue.');
            }

            var textInstance = finishedWork.stateNode;
            var newText = finishedWork.memoizedProps; // For hydration we reuse the update path but we treat the oldProps
            // as the newProps. The updatePayload will contain the real change in
            // this case.

            var oldText = current !== null ? current.memoizedProps : newText;

            try {
              commitTextUpdate(textInstance, oldText, newText);
            } catch (error) {
              captureCommitPhaseError(finishedWork, finishedWork.return, error);
            }
          }
        }

        return;
      }

    case HostRoot:
      {
        recursivelyTraverseMutationEffects(root, finishedWork);
        commitReconciliationEffects(finishedWork);

        if (flags & Update) {
          if (supportsMutation && supportsHydration) {
            if (current !== null) {
              var prevRootState = current.memoizedState;

              if (prevRootState.isDehydrated) {
                try {
                  commitHydratedContainer(root.containerInfo);
                } catch (error) {
                  captureCommitPhaseError(finishedWork, finishedWork.return, error);
                }
              }
            }
          }

          if (supportsPersistence) {
            var containerInfo = root.containerInfo;
            var pendingChildren = root.pendingChildren;

            try {
              replaceContainerChildren(containerInfo, pendingChildren);
            } catch (error) {
              captureCommitPhaseError(finishedWork, finishedWork.return, error);
            }
          }
        }

        return;
      }

    case HostPortal:
      {
        recursivelyTraverseMutationEffects(root, finishedWork);
        commitReconciliationEffects(finishedWork);

        if (flags & Update) {
          if (supportsPersistence) {
            var portal = finishedWork.stateNode;
            var _containerInfo = portal.containerInfo;
            var _pendingChildren = portal.pendingChildren;

            try {
              replaceContainerChildren(_containerInfo, _pendingChildren);
            } catch (error) {
              captureCommitPhaseError(finishedWork, finishedWork.return, error);
            }
          }
        }

        return;
      }

    case SuspenseComponent:
      {
        recursivelyTraverseMutationEffects(root, finishedWork);
        commitReconciliationEffects(finishedWork);
        var offscreenFiber = finishedWork.child;

        if (offscreenFiber.flags & Visibility) {
          var newState = offscreenFiber.memoizedState;
          var isHidden = newState !== null;

          if (isHidden) {
            var wasHidden = offscreenFiber.alternate !== null && offscreenFiber.alternate.memoizedState !== null;

            if (!wasHidden) {
              // TODO: Move to passive phase
              markCommitTimeOfFallback();
            }
          }
        }

        if (flags & Update) {
          try {
            commitSuspenseCallback(finishedWork);
          } catch (error) {
            captureCommitPhaseError(finishedWork, finishedWork.return, error);
          }

          var wakeables = finishedWork.updateQueue;

          if (wakeables !== null) {
            finishedWork.updateQueue = null;
            attachSuspenseRetryListeners(finishedWork, wakeables);
          }
        }

        return;
      }

    case OffscreenComponent:
      {
        if (flags & Ref) {
          if (current !== null) {
            safelyDetachRef(current, current.return);
          }
        }

        var _newState = finishedWork.memoizedState;

        var _isHidden = _newState !== null;

        var _wasHidden = current !== null && current.memoizedState !== null;

        if (finishedWork.mode & ConcurrentMode) {
          // Before committing the children, track on the stack whether this
          // offscreen subtree was already hidden, so that we don't unmount the
          // effects again.
          var prevOffscreenSubtreeIsHidden = offscreenSubtreeIsHidden;
          var prevOffscreenSubtreeWasHidden = offscreenSubtreeWasHidden;
          offscreenSubtreeIsHidden = prevOffscreenSubtreeIsHidden || _isHidden;
          offscreenSubtreeWasHidden = prevOffscreenSubtreeWasHidden || _wasHidden;
          recursivelyTraverseMutationEffects(root, finishedWork);
          offscreenSubtreeWasHidden = prevOffscreenSubtreeWasHidden;
          offscreenSubtreeIsHidden = prevOffscreenSubtreeIsHidden;
        } else {
          recursivelyTraverseMutationEffects(root, finishedWork);
        }

        commitReconciliationEffects(finishedWork);
        var offscreenInstance = finishedWork.stateNode; // TODO: Add explicit effect flag to set _current.

        offscreenInstance._current = finishedWork; // Offscreen stores pending changes to visibility in `_pendingVisibility`. This is
        // to support batching of `attach` and `detach` calls.

        offscreenInstance._visibility &= ~OffscreenDetached;
        offscreenInstance._visibility |= offscreenInstance._pendingVisibility & OffscreenDetached;

        if (flags & Visibility) {
          // Track the current state on the Offscreen instance so we can
          // read it during an event
          if (_isHidden) {
            offscreenInstance._visibility &= ~OffscreenVisible;
          } else {
            offscreenInstance._visibility |= OffscreenVisible;
          }

          if (_isHidden) {
            var isUpdate = current !== null;
            var wasHiddenByAncestorOffscreen = offscreenSubtreeIsHidden || offscreenSubtreeWasHidden; // Only trigger disapper layout effects if:
            //   - This is an update, not first mount.
            //   - This Offscreen was not hidden before.
            //   - Ancestor Offscreen was not hidden in previous commit.

            if (isUpdate && !_wasHidden && !wasHiddenByAncestorOffscreen) {
              if ((finishedWork.mode & ConcurrentMode) !== NoMode) {
                // Disappear the layout effects of all the children
                recursivelyTraverseDisappearLayoutEffects(finishedWork);
              }
            }
          } // Offscreen with manual mode manages visibility manually.


          if (supportsMutation && !isOffscreenManual(finishedWork)) {
            // TODO: This needs to run whenever there's an insertion or update
            // inside a hidden Offscreen tree.
            hideOrUnhideAllChildren(finishedWork, _isHidden);
          }
        } // TODO: Move to passive phase


        if (flags & Update) {
          var offscreenQueue = finishedWork.updateQueue;

          if (offscreenQueue !== null) {
            var _wakeables = offscreenQueue.wakeables;

            if (_wakeables !== null) {
              offscreenQueue.wakeables = null;
              attachSuspenseRetryListeners(finishedWork, _wakeables);
            }
          }
        }

        return;
      }

    case SuspenseListComponent:
      {
        recursivelyTraverseMutationEffects(root, finishedWork);
        commitReconciliationEffects(finishedWork);

        if (flags & Update) {
          var _wakeables2 = finishedWork.updateQueue;

          if (_wakeables2 !== null) {
            finishedWork.updateQueue = null;
            attachSuspenseRetryListeners(finishedWork, _wakeables2);
          }
        }

        return;
      }

    case ScopeComponent:
      {

        return;
      }

    default:
      {
        recursivelyTraverseMutationEffects(root, finishedWork);
        commitReconciliationEffects(finishedWork);
        return;
      }
  }
}

function commitReconciliationEffects(finishedWork) {
  // Placement effects (insertions, reorders) can be scheduled on any fiber
  // type. They needs to happen after the children effects have fired, but
  // before the effects on this fiber have fired.
  var flags = finishedWork.flags;

  if (flags & Placement) {
    try {
      commitPlacement(finishedWork);
    } catch (error) {
      captureCommitPhaseError(finishedWork, finishedWork.return, error);
    } // Clear the "placement" from effect tag so that we know that this is
    // inserted, before any life-cycles like componentDidMount gets called.
    // TODO: findDOMNode doesn't rely on this any more but isMounted does
    // and isMounted is deprecated anyway so we should be able to kill this.


    finishedWork.flags &= ~Placement;
  }

  if (flags & Hydrating) {
    finishedWork.flags &= ~Hydrating;
  }
}

function commitLayoutEffects(finishedWork, root, committedLanes) {
  inProgressLanes = committedLanes;
  inProgressRoot = root;
  var current = finishedWork.alternate;
  commitLayoutEffectOnFiber(root, current, finishedWork);
  inProgressLanes = null;
  inProgressRoot = null;
}

function recursivelyTraverseLayoutEffects(root, parentFiber, lanes) {

  if (parentFiber.subtreeFlags & LayoutMask) {
    var child = parentFiber.child;

    while (child !== null) {
      var current = child.alternate;
      commitLayoutEffectOnFiber(root, current, child);
      child = child.sibling;
    }
  }
}

function disappearLayoutEffects(finishedWork) {
  switch (finishedWork.tag) {
    case FunctionComponent:
    case ForwardRef:
    case MemoComponent:
    case SimpleMemoComponent:
      {
        // TODO (Offscreen) Check: flags & LayoutStatic
        if (shouldProfile(finishedWork)) {
          try {
            startLayoutEffectTimer();
            commitHookEffectListUnmount(Layout, finishedWork, finishedWork.return);
          } finally {
            recordLayoutEffectDuration(finishedWork);
          }
        } else {
          commitHookEffectListUnmount(Layout, finishedWork, finishedWork.return);
        }

        recursivelyTraverseDisappearLayoutEffects(finishedWork);
        break;
      }

    case ClassComponent:
      {
        // TODO (Offscreen) Check: flags & RefStatic
        safelyDetachRef(finishedWork, finishedWork.return);
        var instance = finishedWork.stateNode;

        if (typeof instance.componentWillUnmount === 'function') {
          safelyCallComponentWillUnmount(finishedWork, finishedWork.return, instance);
        }

        recursivelyTraverseDisappearLayoutEffects(finishedWork);
        break;
      }

    case HostResource:
    case HostSingleton:
    case HostComponent:
      {
        // TODO (Offscreen) Check: flags & RefStatic
        safelyDetachRef(finishedWork, finishedWork.return);
        recursivelyTraverseDisappearLayoutEffects(finishedWork);
        break;
      }

    case OffscreenComponent:
      {
        // TODO (Offscreen) Check: flags & RefStatic
        safelyDetachRef(finishedWork, finishedWork.return);
        var isHidden = finishedWork.memoizedState !== null;

        if (isHidden) ; else {
          recursivelyTraverseDisappearLayoutEffects(finishedWork);
        }

        break;
      }

    default:
      {
        recursivelyTraverseDisappearLayoutEffects(finishedWork);
        break;
      }
  }
}

function recursivelyTraverseDisappearLayoutEffects(parentFiber) {
  // TODO (Offscreen) Check: flags & (RefStatic | LayoutStatic)
  var child = parentFiber.child;

  while (child !== null) {
    disappearLayoutEffects(child);
    child = child.sibling;
  }
}

function reappearLayoutEffects(finishedRoot, current, finishedWork, // This function visits both newly finished work and nodes that were re-used
// from a previously committed tree. We cannot check non-static flags if the
// node was reused.
includeWorkInProgressEffects) {
  // Turn on layout effects in a tree that previously disappeared.
  var flags = finishedWork.flags;

  switch (finishedWork.tag) {
    case FunctionComponent:
    case ForwardRef:
    case SimpleMemoComponent:
      {
        recursivelyTraverseReappearLayoutEffects(finishedRoot, finishedWork, includeWorkInProgressEffects); // TODO: Check flags & LayoutStatic

        commitHookLayoutEffects(finishedWork, Layout);
        break;
      }

    case ClassComponent:
      {
        recursivelyTraverseReappearLayoutEffects(finishedRoot, finishedWork, includeWorkInProgressEffects); // TODO: Check for LayoutStatic flag

        var instance = finishedWork.stateNode;

        if (typeof instance.componentDidMount === 'function') {
          try {
            instance.componentDidMount();
          } catch (error) {
            captureCommitPhaseError(finishedWork, finishedWork.return, error);
          }
        } // Commit any callbacks that would have fired while the component
        // was hidden.


        var updateQueue = finishedWork.updateQueue;

        if (updateQueue !== null) {
          commitHiddenCallbacks(updateQueue, instance);
        } // If this is newly finished work, check for setState callbacks


        if (includeWorkInProgressEffects && flags & Callback) {
          commitClassCallbacks(finishedWork);
        } // TODO: Check flags & RefStatic


        safelyAttachRef(finishedWork, finishedWork.return);
        break;
      }
    // Unlike commitLayoutEffectsOnFiber, we don't need to handle HostRoot
    // because this function only visits nodes that are inside an
    // Offscreen fiber.
    // case HostRoot: {
    //  ...
    // }

    case HostResource:
    case HostSingleton:
    case HostComponent:
      {
        recursivelyTraverseReappearLayoutEffects(finishedRoot, finishedWork, includeWorkInProgressEffects); // Renderers may schedule work to be done after host components are mounted
        // (eg DOM renderer may schedule auto-focus for inputs and form controls).
        // These effects should only be committed when components are first mounted,
        // aka when there is no current/alternate.

        if (includeWorkInProgressEffects && current === null && flags & Update) {
          commitHostComponentMount(finishedWork);
        } // TODO: Check flags & Ref


        safelyAttachRef(finishedWork, finishedWork.return);
        break;
      }

    case Profiler:
      {
        recursivelyTraverseReappearLayoutEffects(finishedRoot, finishedWork, includeWorkInProgressEffects); // TODO: Figure out how Profiler updates should work with Offscreen

        if (includeWorkInProgressEffects && flags & Update) {
          commitProfilerUpdate(finishedWork, current);
        }

        break;
      }

    case SuspenseComponent:
      {
        recursivelyTraverseReappearLayoutEffects(finishedRoot, finishedWork, includeWorkInProgressEffects); // TODO: Figure out how Suspense hydration callbacks should work
        // with Offscreen.

        if (includeWorkInProgressEffects && flags & Update) {
          commitSuspenseHydrationCallbacks(finishedRoot, finishedWork);
        }

        break;
      }

    case OffscreenComponent:
      {
        var offscreenState = finishedWork.memoizedState;
        var isHidden = offscreenState !== null;

        if (isHidden) ; else {
          recursivelyTraverseReappearLayoutEffects(finishedRoot, finishedWork, includeWorkInProgressEffects);
        } // TODO: Check flags & Ref


        safelyAttachRef(finishedWork, finishedWork.return);
        break;
      }

    default:
      {
        recursivelyTraverseReappearLayoutEffects(finishedRoot, finishedWork, includeWorkInProgressEffects);
        break;
      }
  }
}

function recursivelyTraverseReappearLayoutEffects(finishedRoot, parentFiber, includeWorkInProgressEffects) {
  // This function visits both newly finished work and nodes that were re-used
  // from a previously committed tree. We cannot check non-static flags if the
  // node was reused.
  var childShouldIncludeWorkInProgressEffects = includeWorkInProgressEffects && (parentFiber.subtreeFlags & LayoutMask) !== NoFlags; // TODO (Offscreen) Check: flags & (RefStatic | LayoutStatic)
  var child = parentFiber.child;

  while (child !== null) {
    var current = child.alternate;
    reappearLayoutEffects(finishedRoot, current, child, childShouldIncludeWorkInProgressEffects);
    child = child.sibling;
  }
}

function commitHookPassiveMountEffects(finishedWork, hookFlags) {
  if (shouldProfile(finishedWork)) {
    startPassiveEffectTimer();

    try {
      commitHookEffectListMount(hookFlags, finishedWork);
    } catch (error) {
      captureCommitPhaseError(finishedWork, finishedWork.return, error);
    }

    recordPassiveEffectDuration(finishedWork);
  } else {
    try {
      commitHookEffectListMount(hookFlags, finishedWork);
    } catch (error) {
      captureCommitPhaseError(finishedWork, finishedWork.return, error);
    }
  }
}

function commitOffscreenPassiveMountEffects(current, finishedWork, instance) {
  {
    var previousCache = null;

    if (current !== null && current.memoizedState !== null && current.memoizedState.cachePool !== null) {
      previousCache = current.memoizedState.cachePool.pool;
    }

    var nextCache = null;

    if (finishedWork.memoizedState !== null && finishedWork.memoizedState.cachePool !== null) {
      nextCache = finishedWork.memoizedState.cachePool.pool;
    } // Retain/release the cache used for pending (suspended) nodes.
    // Note that this is only reached in the non-suspended/visible case:
    // when the content is suspended/hidden, the retain/release occurs
    // via the parent Suspense component (see case above).


    if (nextCache !== previousCache) {
      if (nextCache != null) {
        retainCache(nextCache);
      }

      if (previousCache != null) {
        releaseCache(previousCache);
      }
    }
  }
}

function commitCachePassiveMountEffect(current, finishedWork) {
  {
    var previousCache = null;

    if (finishedWork.alternate !== null) {
      previousCache = finishedWork.alternate.memoizedState.cache;
    }

    var nextCache = finishedWork.memoizedState.cache; // Retain/release the cache. In theory the cache component
    // could be "borrowing" a cache instance owned by some parent,
    // in which case we could avoid retaining/releasing. But it
    // is non-trivial to determine when that is the case, so we
    // always retain/release.

    if (nextCache !== previousCache) {
      retainCache(nextCache);

      if (previousCache != null) {
        releaseCache(previousCache);
      }
    }
  }
}

function commitPassiveMountEffects(root, finishedWork, committedLanes, committedTransitions) {
  commitPassiveMountOnFiber(root, finishedWork, committedLanes, committedTransitions);
}

function recursivelyTraversePassiveMountEffects(root, parentFiber, committedLanes, committedTransitions) {

  if (parentFiber.subtreeFlags & PassiveMask) {
    var child = parentFiber.child;

    while (child !== null) {
      commitPassiveMountOnFiber(root, child, committedLanes, committedTransitions);
      child = child.sibling;
    }
  }
}

function commitPassiveMountOnFiber(finishedRoot, finishedWork, committedLanes, committedTransitions) {
  // When updating this function, also update reconnectPassiveEffects, which does
  // most of the same things when an offscreen tree goes from hidden -> visible,
  // or when toggling effects inside a hidden tree.
  var flags = finishedWork.flags;

  switch (finishedWork.tag) {
    case FunctionComponent:
    case ForwardRef:
    case SimpleMemoComponent:
      {
        recursivelyTraversePassiveMountEffects(finishedRoot, finishedWork, committedLanes, committedTransitions);

        if (flags & Passive) {
          commitHookPassiveMountEffects(finishedWork, Passive$1 | HasEffect);
        }

        break;
      }

    case HostRoot:
      {
        recursivelyTraversePassiveMountEffects(finishedRoot, finishedWork, committedLanes, committedTransitions);

        if (flags & Passive) {
          {
            var previousCache = null;

            if (finishedWork.alternate !== null) {
              previousCache = finishedWork.alternate.memoizedState.cache;
            }

            var nextCache = finishedWork.memoizedState.cache; // Retain/release the root cache.
            // Note that on initial mount, previousCache and nextCache will be the same
            // and this retain won't occur. To counter this, we instead retain the HostRoot's
            // initial cache when creating the root itself (see createFiberRoot() in
            // ReactFiberRoot.js). Subsequent updates that change the cache are reflected
            // here, such that previous/next caches are retained correctly.

            if (nextCache !== previousCache) {
              retainCache(nextCache);

              if (previousCache != null) {
                releaseCache(previousCache);
              }
            }
          }
        }

        break;
      }

    case LegacyHiddenComponent:
      {

        break;
      }

    case OffscreenComponent:
      {
        // TODO: Pass `current` as argument to this function
        var _instance3 = finishedWork.stateNode;
        var nextState = finishedWork.memoizedState;
        var isHidden = nextState !== null;

        if (isHidden) {
          if (_instance3._visibility & OffscreenPassiveEffectsConnected) {
            // The effects are currently connected. Update them.
            recursivelyTraversePassiveMountEffects(finishedRoot, finishedWork, committedLanes, committedTransitions);
          } else {
            if (finishedWork.mode & ConcurrentMode) {
              // The effects are currently disconnected. Since the tree is hidden,
              // don't connect them. This also applies to the initial render.
              {
                // "Atomic" effects are ones that need to fire on every commit,
                // even during pre-rendering. An example is updating the reference
                // count on cache instances.
                recursivelyTraverseAtomicPassiveEffects(finishedRoot, finishedWork);
              }
            } else {
              // Legacy Mode: Fire the effects even if the tree is hidden.
              _instance3._visibility |= OffscreenPassiveEffectsConnected;
              recursivelyTraversePassiveMountEffects(finishedRoot, finishedWork, committedLanes, committedTransitions);
            }
          }
        } else {
          // Tree is visible
          if (_instance3._visibility & OffscreenPassiveEffectsConnected) {
            // The effects are currently connected. Update them.
            recursivelyTraversePassiveMountEffects(finishedRoot, finishedWork, committedLanes, committedTransitions);
          } else {
            // The effects are currently disconnected. Reconnect them, while also
            // firing effects inside newly mounted trees. This also applies to
            // the initial render.
            _instance3._visibility |= OffscreenPassiveEffectsConnected;
            var includeWorkInProgressEffects = (finishedWork.subtreeFlags & PassiveMask) !== NoFlags;
            recursivelyTraverseReconnectPassiveEffects(finishedRoot, finishedWork, committedLanes, committedTransitions, includeWorkInProgressEffects);
          }
        }

        if (flags & Passive) {
          var _current = finishedWork.alternate;
          commitOffscreenPassiveMountEffects(_current, finishedWork);
        }

        break;
      }

    case CacheComponent:
      {
        recursivelyTraversePassiveMountEffects(finishedRoot, finishedWork, committedLanes, committedTransitions);

        if (flags & Passive) {
          // TODO: Pass `current` as argument to this function
          var _current2 = finishedWork.alternate;
          commitCachePassiveMountEffect(_current2, finishedWork);
        }

        break;
      }

    case TracingMarkerComponent:
    // eslint-disable-next-line-no-fallthrough

    default:
      {
        recursivelyTraversePassiveMountEffects(finishedRoot, finishedWork, committedLanes, committedTransitions);
        break;
      }
  }
}

function recursivelyTraverseReconnectPassiveEffects(finishedRoot, parentFiber, committedLanes, committedTransitions, includeWorkInProgressEffects) {
  // This function visits both newly finished work and nodes that were re-used
  // from a previously committed tree. We cannot check non-static flags if the
  // node was reused.
  var childShouldIncludeWorkInProgressEffects = includeWorkInProgressEffects && (parentFiber.subtreeFlags & PassiveMask) !== NoFlags; // TODO (Offscreen) Check: flags & (RefStatic | LayoutStatic)
  var child = parentFiber.child;

  while (child !== null) {
    reconnectPassiveEffects(finishedRoot, child, committedLanes, committedTransitions, childShouldIncludeWorkInProgressEffects);
    child = child.sibling;
  }
}

function reconnectPassiveEffects(finishedRoot, finishedWork, committedLanes, committedTransitions, // This function visits both newly finished work and nodes that were re-used
// from a previously committed tree. We cannot check non-static flags if the
// node was reused.
includeWorkInProgressEffects) {
  var flags = finishedWork.flags;

  switch (finishedWork.tag) {
    case FunctionComponent:
    case ForwardRef:
    case SimpleMemoComponent:
      {
        recursivelyTraverseReconnectPassiveEffects(finishedRoot, finishedWork, committedLanes, committedTransitions, includeWorkInProgressEffects); // TODO: Check for PassiveStatic flag

        commitHookPassiveMountEffects(finishedWork, Passive$1);
        break;
      }
    // Unlike commitPassiveMountOnFiber, we don't need to handle HostRoot
    // because this function only visits nodes that are inside an
    // Offscreen fiber.
    // case HostRoot: {
    //  ...
    // }

    case LegacyHiddenComponent:
      {

        break;
      }

    case OffscreenComponent:
      {
        var _instance4 = finishedWork.stateNode;
        var nextState = finishedWork.memoizedState;
        var isHidden = nextState !== null;

        if (isHidden) {
          if (_instance4._visibility & OffscreenPassiveEffectsConnected) {
            // The effects are currently connected. Update them.
            recursivelyTraverseReconnectPassiveEffects(finishedRoot, finishedWork, committedLanes, committedTransitions, includeWorkInProgressEffects);
          } else {
            if (finishedWork.mode & ConcurrentMode) {
              // The effects are currently disconnected. Since the tree is hidden,
              // don't connect them. This also applies to the initial render.
              {
                // "Atomic" effects are ones that need to fire on every commit,
                // even during pre-rendering. An example is updating the reference
                // count on cache instances.
                recursivelyTraverseAtomicPassiveEffects(finishedRoot, finishedWork);
              }
            } else {
              // Legacy Mode: Fire the effects even if the tree is hidden.
              _instance4._visibility |= OffscreenPassiveEffectsConnected;
              recursivelyTraverseReconnectPassiveEffects(finishedRoot, finishedWork, committedLanes, committedTransitions, includeWorkInProgressEffects);
            }
          }
        } else {
          // Tree is visible
          // Since we're already inside a reconnecting tree, it doesn't matter
          // whether the effects are currently connected. In either case, we'll
          // continue traversing the tree and firing all the effects.
          //
          // We do need to set the "connected" flag on the instance, though.
          _instance4._visibility |= OffscreenPassiveEffectsConnected;
          recursivelyTraverseReconnectPassiveEffects(finishedRoot, finishedWork, committedLanes, committedTransitions, includeWorkInProgressEffects);
        }

        if (includeWorkInProgressEffects && flags & Passive) {
          // TODO: Pass `current` as argument to this function
          var _current3 = finishedWork.alternate;
          commitOffscreenPassiveMountEffects(_current3, finishedWork);
        }

        break;
      }

    case CacheComponent:
      {
        recursivelyTraverseReconnectPassiveEffects(finishedRoot, finishedWork, committedLanes, committedTransitions, includeWorkInProgressEffects);

        if (includeWorkInProgressEffects && flags & Passive) {
          // TODO: Pass `current` as argument to this function
          var _current4 = finishedWork.alternate;
          commitCachePassiveMountEffect(_current4, finishedWork);
        }

        break;
      }

    case TracingMarkerComponent:
    // eslint-disable-next-line-no-fallthrough

    default:
      {
        recursivelyTraverseReconnectPassiveEffects(finishedRoot, finishedWork, committedLanes, committedTransitions, includeWorkInProgressEffects);
        break;
      }
  }
}

function recursivelyTraverseAtomicPassiveEffects(finishedRoot, parentFiber, committedLanes, committedTransitions) {

  if (parentFiber.subtreeFlags & PassiveMask) {
    var child = parentFiber.child;

    while (child !== null) {
      commitAtomicPassiveEffects(finishedRoot, child);
      child = child.sibling;
    }
  }
}

function commitAtomicPassiveEffects(finishedRoot, finishedWork, committedLanes, committedTransitions) {
  // "Atomic" effects are ones that need to fire on every commit, even during
  // pre-rendering. We call this function when traversing a hidden tree whose
  // regular effects are currently disconnected.
  var flags = finishedWork.flags;

  switch (finishedWork.tag) {
    case OffscreenComponent:
      {
        recursivelyTraverseAtomicPassiveEffects(finishedRoot, finishedWork);

        if (flags & Passive) {
          // TODO: Pass `current` as argument to this function
          var current = finishedWork.alternate;
          var instance = finishedWork.stateNode;
          commitOffscreenPassiveMountEffects(current, finishedWork);
        }

        break;
      }

    case CacheComponent:
      {
        recursivelyTraverseAtomicPassiveEffects(finishedRoot, finishedWork);

        if (flags & Passive) {
          // TODO: Pass `current` as argument to this function
          var _current5 = finishedWork.alternate;
          commitCachePassiveMountEffect(_current5, finishedWork);
        }

        break;
      }
    // eslint-disable-next-line-no-fallthrough

    default:
      {
        recursivelyTraverseAtomicPassiveEffects(finishedRoot, finishedWork);
        break;
      }
  }
}

function commitPassiveUnmountEffects(finishedWork) {
  commitPassiveUnmountOnFiber(finishedWork);
}

function detachAlternateSiblings(parentFiber) {
  {
    // A fiber was deleted from this parent fiber, but it's still part of the
    // previous (alternate) parent fiber's list of children. Because children
    // are a linked list, an earlier sibling that's still alive will be
    // connected to the deleted fiber via its `alternate`:
    //
    //   live fiber --alternate--> previous live fiber --sibling--> deleted
    //   fiber
    //
    // We can't disconnect `alternate` on nodes that haven't been deleted yet,
    // but we can disconnect the `sibling` and `child` pointers.
    var previousFiber = parentFiber.alternate;

    if (previousFiber !== null) {
      var detachedChild = previousFiber.child;

      if (detachedChild !== null) {
        previousFiber.child = null;

        do {
          // $FlowFixMe[incompatible-use] found when upgrading Flow
          var detachedSibling = detachedChild.sibling; // $FlowFixMe[incompatible-use] found when upgrading Flow

          detachedChild.sibling = null;
          detachedChild = detachedSibling;
        } while (detachedChild !== null);
      }
    }
  }
}

function commitHookPassiveUnmountEffects(finishedWork, nearestMountedAncestor, hookFlags) {
  if (shouldProfile(finishedWork)) {
    startPassiveEffectTimer();
    commitHookEffectListUnmount(hookFlags, finishedWork, nearestMountedAncestor);
    recordPassiveEffectDuration(finishedWork);
  } else {
    commitHookEffectListUnmount(hookFlags, finishedWork, nearestMountedAncestor);
  }
}

function recursivelyTraversePassiveUnmountEffects(parentFiber) {
  // Deletions effects can be scheduled on any fiber type. They need to happen
  // before the children effects have fired.
  var deletions = parentFiber.deletions;

  if ((parentFiber.flags & ChildDeletion) !== NoFlags) {
    if (deletions !== null) {
      for (var i = 0; i < deletions.length; i++) {
        var childToDelete = deletions[i]; // TODO: Convert this to use recursion

        nextEffect = childToDelete;
        commitPassiveUnmountEffectsInsideOfDeletedTree_begin(childToDelete, parentFiber);
      }
    }

    detachAlternateSiblings(parentFiber);
  }

  if (parentFiber.subtreeFlags & PassiveMask) {
    var child = parentFiber.child;

    while (child !== null) {
      commitPassiveUnmountOnFiber(child);
      child = child.sibling;
    }
  }
}

function commitPassiveUnmountOnFiber(finishedWork) {
  switch (finishedWork.tag) {
    case FunctionComponent:
    case ForwardRef:
    case SimpleMemoComponent:
      {
        recursivelyTraversePassiveUnmountEffects(finishedWork);

        if (finishedWork.flags & Passive) {
          commitHookPassiveUnmountEffects(finishedWork, finishedWork.return, Passive$1 | HasEffect);
        }

        break;
      }

    case OffscreenComponent:
      {
        var instance = finishedWork.stateNode;
        var nextState = finishedWork.memoizedState;
        var isHidden = nextState !== null;

        if (isHidden && instance._visibility & OffscreenPassiveEffectsConnected && ( // For backwards compatibility, don't unmount when a tree suspends. In
        // the future we may change this to unmount after a delay.
        finishedWork.return === null || finishedWork.return.tag !== SuspenseComponent)) {
          // The effects are currently connected. Disconnect them.
          // TODO: Add option or heuristic to delay before disconnecting the
          // effects. Then if the tree reappears before the delay has elapsed, we
          // can skip toggling the effects entirely.
          instance._visibility &= ~OffscreenPassiveEffectsConnected;
          recursivelyTraverseDisconnectPassiveEffects(finishedWork);
        } else {
          recursivelyTraversePassiveUnmountEffects(finishedWork);
        }

        break;
      }

    default:
      {
        recursivelyTraversePassiveUnmountEffects(finishedWork);
        break;
      }
  }
}

function recursivelyTraverseDisconnectPassiveEffects(parentFiber) {
  // Deletions effects can be scheduled on any fiber type. They need to happen
  // before the children effects have fired.
  var deletions = parentFiber.deletions;

  if ((parentFiber.flags & ChildDeletion) !== NoFlags) {
    if (deletions !== null) {
      for (var i = 0; i < deletions.length; i++) {
        var childToDelete = deletions[i]; // TODO: Convert this to use recursion

        nextEffect = childToDelete;
        commitPassiveUnmountEffectsInsideOfDeletedTree_begin(childToDelete, parentFiber);
      }
    }

    detachAlternateSiblings(parentFiber);
  }

  var child = parentFiber.child;

  while (child !== null) {
    disconnectPassiveEffect(child);
    child = child.sibling;
  }
}

function disconnectPassiveEffect(finishedWork) {
  switch (finishedWork.tag) {
    case FunctionComponent:
    case ForwardRef:
    case SimpleMemoComponent:
      {
        // TODO: Check PassiveStatic flag
        commitHookPassiveUnmountEffects(finishedWork, finishedWork.return, Passive$1); // When disconnecting passive effects, we fire the effects in the same
        // order as during a deletiong: parent before child

        recursivelyTraverseDisconnectPassiveEffects(finishedWork);
        break;
      }

    case OffscreenComponent:
      {
        var instance = finishedWork.stateNode;

        if (instance._visibility & OffscreenPassiveEffectsConnected) {
          instance._visibility &= ~OffscreenPassiveEffectsConnected;
          recursivelyTraverseDisconnectPassiveEffects(finishedWork);
        }

        break;
      }

    default:
      {
        recursivelyTraverseDisconnectPassiveEffects(finishedWork);
        break;
      }
  }
}

function commitPassiveUnmountEffectsInsideOfDeletedTree_begin(deletedSubtreeRoot, nearestMountedAncestor) {
  while (nextEffect !== null) {
    var fiber = nextEffect; // Deletion effects fire in parent -> child order
    commitPassiveUnmountInsideDeletedTreeOnFiber(fiber, nearestMountedAncestor);
    var child = fiber.child; // TODO: Only traverse subtree if it has a PassiveStatic flag. (But, if we
    // do this, still need to handle `deletedTreeCleanUpLevel` correctly.)

    if (child !== null) {
      child.return = fiber;
      nextEffect = child;
    } else {
      commitPassiveUnmountEffectsInsideOfDeletedTree_complete(deletedSubtreeRoot);
    }
  }
}

function commitPassiveUnmountEffectsInsideOfDeletedTree_complete(deletedSubtreeRoot) {
  while (nextEffect !== null) {
    var fiber = nextEffect;
    var sibling = fiber.sibling;
    var returnFiber = fiber.return;

    {
      // Recursively traverse the entire deleted tree and clean up fiber fields.
      // This is more aggressive than ideal, and the long term goal is to only
      // have to detach the deleted tree at the root.
      detachFiberAfterEffects(fiber);

      if (fiber === deletedSubtreeRoot) {
        nextEffect = null;
        return;
      }
    }

    if (sibling !== null) {
      sibling.return = returnFiber;
      nextEffect = sibling;
      return;
    }

    nextEffect = returnFiber;
  }
}

function commitPassiveUnmountInsideDeletedTreeOnFiber(current, nearestMountedAncestor) {
  switch (current.tag) {
    case FunctionComponent:
    case ForwardRef:
    case SimpleMemoComponent:
      {
        commitHookPassiveUnmountEffects(current, nearestMountedAncestor, Passive$1);
        break;
      }
    // TODO: run passive unmount effects when unmounting a root.
    // Because passive unmount effects are not currently run,
    // the cache instance owned by the root will never be freed.
    // When effects are run, the cache should be freed here:
    // case HostRoot: {
    //   if (enableCache) {
    //     const cache = current.memoizedState.cache;
    //     releaseCache(cache);
    //   }
    //   break;
    // }

    case LegacyHiddenComponent:
    case OffscreenComponent:
      {
        {
          if (current.memoizedState !== null && current.memoizedState.cachePool !== null) {
            var cache = current.memoizedState.cachePool.pool; // Retain/release the cache used for pending (suspended) nodes.
            // Note that this is only reached in the non-suspended/visible case:
            // when the content is suspended/hidden, the retain/release occurs
            // via the parent Suspense component (see case above).

            if (cache != null) {
              retainCache(cache);
            }
          }
        }

        break;
      }

    case SuspenseComponent:
      {

        break;
      }

    case CacheComponent:
      {
        {
          var _cache = current.memoizedState.cache;
          releaseCache(_cache);
        }

        break;
      }
  }
}

function getCacheSignal() {

  var cache = readContext(CacheContext);
  return cache.controller.signal;
}

function getCacheForType(resourceType) {

  var cache = readContext(CacheContext);
  var cacheForType = cache.data.get(resourceType);

  if (cacheForType === undefined) {
    cacheForType = resourceType();
    cache.data.set(resourceType, cacheForType);
  }

  return cacheForType;
}

var DefaultCacheDispatcher = {
  getCacheSignal: getCacheSignal,
  getCacheForType: getCacheForType
};

var COMPONENT_TYPE = 0;
var HAS_PSEUDO_CLASS_TYPE = 1;
var ROLE_TYPE = 2;
var TEST_NAME_TYPE = 3;
var TEXT_TYPE = 4;

if (typeof Symbol === 'function' && Symbol.for) {
  var symbolFor = Symbol.for;
  COMPONENT_TYPE = symbolFor('selector.component');
  HAS_PSEUDO_CLASS_TYPE = symbolFor('selector.has_pseudo_class');
  ROLE_TYPE = symbolFor('selector.role');
  TEST_NAME_TYPE = symbolFor('selector.test_id');
  TEXT_TYPE = symbolFor('selector.text');
}

function createComponentSelector(component) {
  return {
    $$typeof: COMPONENT_TYPE,
    value: component
  };
}
function createHasPseudoClassSelector(selectors) {
  return {
    $$typeof: HAS_PSEUDO_CLASS_TYPE,
    value: selectors
  };
}
function createRoleSelector(role) {
  return {
    $$typeof: ROLE_TYPE,
    value: role
  };
}
function createTextSelector(text) {
  return {
    $$typeof: TEXT_TYPE,
    value: text
  };
}
function createTestNameSelector(id) {
  return {
    $$typeof: TEST_NAME_TYPE,
    value: id
  };
}

function findFiberRootForHostRoot(hostRoot) {
  var maybeFiber = getInstanceFromNode(hostRoot);

  if (maybeFiber != null) {
    if (typeof maybeFiber.memoizedProps['data-testname'] !== 'string') {
      throw new Error('Invalid host root specified. Should be either a React container or a node with a testname attribute.');
    }

    return maybeFiber;
  } else {
    var fiberRoot = findFiberRoot(hostRoot);

    if (fiberRoot === null) {
      throw new Error('Could not find React container within specified host subtree.');
    } // The Flow type for FiberRoot is a little funky.
    // createFiberRoot() cheats this by treating the root as :any and adding stateNode lazily.


    return fiberRoot.stateNode.current;
  }
}

function matchSelector(fiber, selector) {
  var tag = fiber.tag;

  switch (selector.$$typeof) {
    case COMPONENT_TYPE:
      if (fiber.type === selector.value) {
        return true;
      }

      break;

    case HAS_PSEUDO_CLASS_TYPE:
      return hasMatchingPaths(fiber, selector.value);

    case ROLE_TYPE:
      if (tag === HostComponent || tag === HostResource || tag === HostSingleton) {
        var node = fiber.stateNode;

        if (matchAccessibilityRole(node, selector.value)) {
          return true;
        }
      }

      break;

    case TEXT_TYPE:
      if (tag === HostComponent || tag === HostText || tag === HostResource || tag === HostSingleton) {
        var textContent = getTextContent(fiber);

        if (textContent !== null && textContent.indexOf(selector.value) >= 0) {
          return true;
        }
      }

      break;

    case TEST_NAME_TYPE:
      if (tag === HostComponent || tag === HostResource || tag === HostSingleton) {
        var dataTestID = fiber.memoizedProps['data-testname'];

        if (typeof dataTestID === 'string' && dataTestID.toLowerCase() === selector.value.toLowerCase()) {
          return true;
        }
      }

      break;

    default:
      throw new Error('Invalid selector type specified.');
  }

  return false;
}

function selectorToString(selector) {
  switch (selector.$$typeof) {
    case COMPONENT_TYPE:
      var displayName = getComponentNameFromType(selector.value) || 'Unknown';
      return "<" + displayName + ">";

    case HAS_PSEUDO_CLASS_TYPE:
      return ":has(" + (selectorToString(selector) || '') + ")";

    case ROLE_TYPE:
      return "[role=\"" + selector.value + "\"]";

    case TEXT_TYPE:
      return "\"" + selector.value + "\"";

    case TEST_NAME_TYPE:
      return "[data-testname=\"" + selector.value + "\"]";

    default:
      throw new Error('Invalid selector type specified.');
  }
}

function findPaths(root, selectors) {
  var matchingFibers = [];
  var stack = [root, 0];
  var index = 0;

  while (index < stack.length) {
    var fiber = stack[index++];
    var tag = fiber.tag;
    var selectorIndex = stack[index++];
    var selector = selectors[selectorIndex];

    if ((tag === HostComponent || tag === HostResource || tag === HostSingleton) && isHiddenSubtree(fiber)) {
      continue;
    } else {
      while (selector != null && matchSelector(fiber, selector)) {
        selectorIndex++;
        selector = selectors[selectorIndex];
      }
    }

    if (selectorIndex === selectors.length) {
      matchingFibers.push(fiber);
    } else {
      var child = fiber.child;

      while (child !== null) {
        stack.push(child, selectorIndex);
        child = child.sibling;
      }
    }
  }

  return matchingFibers;
} // Same as findPaths but with eager bailout on first match


function hasMatchingPaths(root, selectors) {
  var stack = [root, 0];
  var index = 0;

  while (index < stack.length) {
    var fiber = stack[index++];
    var tag = fiber.tag;
    var selectorIndex = stack[index++];
    var selector = selectors[selectorIndex];

    if ((tag === HostComponent || tag === HostResource || tag === HostSingleton) && isHiddenSubtree(fiber)) {
      continue;
    } else {
      while (selector != null && matchSelector(fiber, selector)) {
        selectorIndex++;
        selector = selectors[selectorIndex];
      }
    }

    if (selectorIndex === selectors.length) {
      return true;
    } else {
      var child = fiber.child;

      while (child !== null) {
        stack.push(child, selectorIndex);
        child = child.sibling;
      }
    }
  }

  return false;
}

function findAllNodes(hostRoot, selectors) {
  if (!supportsTestSelectors) {
    throw new Error('Test selector API is not supported by this renderer.');
  }

  var root = findFiberRootForHostRoot(hostRoot);
  var matchingFibers = findPaths(root, selectors);
  var instanceRoots = [];
  var stack = Array.from(matchingFibers);
  var index = 0;

  while (index < stack.length) {
    var node = stack[index++];
    var tag = node.tag;

    if (tag === HostComponent || tag === HostResource || tag === HostSingleton) {
      if (isHiddenSubtree(node)) {
        continue;
      }

      instanceRoots.push(node.stateNode);
    } else {
      var child = node.child;

      while (child !== null) {
        stack.push(child);
        child = child.sibling;
      }
    }
  }

  return instanceRoots;
}
function getFindAllNodesFailureDescription(hostRoot, selectors) {
  if (!supportsTestSelectors) {
    throw new Error('Test selector API is not supported by this renderer.');
  }

  var root = findFiberRootForHostRoot(hostRoot);
  var maxSelectorIndex = 0;
  var matchedNames = []; // The logic of this loop should be kept in sync with findPaths()

  var stack = [root, 0];
  var index = 0;

  while (index < stack.length) {
    var fiber = stack[index++];
    var tag = fiber.tag;
    var selectorIndex = stack[index++];
    var selector = selectors[selectorIndex];

    if ((tag === HostComponent || tag === HostResource || tag === HostSingleton) && isHiddenSubtree(fiber)) {
      continue;
    } else if (matchSelector(fiber, selector)) {
      matchedNames.push(selectorToString(selector));
      selectorIndex++;

      if (selectorIndex > maxSelectorIndex) {
        maxSelectorIndex = selectorIndex;
      }
    }

    if (selectorIndex < selectors.length) {
      var child = fiber.child;

      while (child !== null) {
        stack.push(child, selectorIndex);
        child = child.sibling;
      }
    }
  }

  if (maxSelectorIndex < selectors.length) {
    var unmatchedNames = [];

    for (var i = maxSelectorIndex; i < selectors.length; i++) {
      unmatchedNames.push(selectorToString(selectors[i]));
    }

    return 'findAllNodes was able to match part of the selector:\n' + ("  " + matchedNames.join(' > ') + "\n\n") + 'No matching component was found for:\n' + ("  " + unmatchedNames.join(' > '));
  }

  return null;
}
function findBoundingRects(hostRoot, selectors) {
  if (!supportsTestSelectors) {
    throw new Error('Test selector API is not supported by this renderer.');
  }

  var instanceRoots = findAllNodes(hostRoot, selectors);
  var boundingRects = [];

  for (var i = 0; i < instanceRoots.length; i++) {
    boundingRects.push(getBoundingRect(instanceRoots[i]));
  }

  for (var _i = boundingRects.length - 1; _i > 0; _i--) {
    var targetRect = boundingRects[_i];
    var targetLeft = targetRect.x;
    var targetRight = targetLeft + targetRect.width;
    var targetTop = targetRect.y;
    var targetBottom = targetTop + targetRect.height;

    for (var j = _i - 1; j >= 0; j--) {
      if (_i !== j) {
        var otherRect = boundingRects[j];
        var otherLeft = otherRect.x;
        var otherRight = otherLeft + otherRect.width;
        var otherTop = otherRect.y;
        var otherBottom = otherTop + otherRect.height; // Merging all rects to the minimums set would be complicated,
        // but we can handle the most common cases:
        // 1. completely overlapping rects
        // 2. adjacent rects that are the same width or height (e.g. items in a list)
        //
        // Even given the above constraints,
        // we still won't end up with the fewest possible rects without doing multiple passes,
        // but it's good enough for this purpose.

        if (targetLeft >= otherLeft && targetTop >= otherTop && targetRight <= otherRight && targetBottom <= otherBottom) {
          // Complete overlapping rects; remove the inner one.
          boundingRects.splice(_i, 1);
          break;
        } else if (targetLeft === otherLeft && targetRect.width === otherRect.width && !(otherBottom < targetTop) && !(otherTop > targetBottom)) {
          // Adjacent vertical rects; merge them.
          if (otherTop > targetTop) {
            otherRect.height += otherTop - targetTop;
            otherRect.y = targetTop;
          }

          if (otherBottom < targetBottom) {
            otherRect.height = targetBottom - otherTop;
          }

          boundingRects.splice(_i, 1);
          break;
        } else if (targetTop === otherTop && targetRect.height === otherRect.height && !(otherRight < targetLeft) && !(otherLeft > targetRight)) {
          // Adjacent horizontal rects; merge them.
          if (otherLeft > targetLeft) {
            otherRect.width += otherLeft - targetLeft;
            otherRect.x = targetLeft;
          }

          if (otherRight < targetRight) {
            otherRect.width = targetRight - otherLeft;
          }

          boundingRects.splice(_i, 1);
          break;
        }
      }
    }
  }

  return boundingRects;
}
function focusWithin(hostRoot, selectors) {
  if (!supportsTestSelectors) {
    throw new Error('Test selector API is not supported by this renderer.');
  }

  var root = findFiberRootForHostRoot(hostRoot);
  var matchingFibers = findPaths(root, selectors);
  var stack = Array.from(matchingFibers);
  var index = 0;

  while (index < stack.length) {
    var fiber = stack[index++];
    var tag = fiber.tag;

    if (isHiddenSubtree(fiber)) {
      continue;
    }

    if (tag === HostComponent || tag === HostResource || tag === HostSingleton) {
      var node = fiber.stateNode;

      if (setFocusIfFocusable(node)) {
        return true;
      }
    }

    var child = fiber.child;

    while (child !== null) {
      stack.push(child);
      child = child.sibling;
    }
  }

  return false;
}
function observeVisibleRects(hostRoot, selectors, callback, options) {
  if (!supportsTestSelectors) {
    throw new Error('Test selector API is not supported by this renderer.');
  }

  var instanceRoots = findAllNodes(hostRoot, selectors);

  var _setupIntersectionObs = setupIntersectionObserver(instanceRoots, callback, options),
      disconnect = _setupIntersectionObs.disconnect,
      observe = _setupIntersectionObs.observe,
      unobserve = _setupIntersectionObs.unobserve; // When React mutates the host environment, we may need to change what we're listening to.
  return {
    disconnect: function () {


      disconnect();
    }
  };
}

var ReactCurrentActQueue$1 = ReactSharedInternals.ReactCurrentActQueue;

var ceil = Math.ceil;
var PossiblyWeakMap = typeof WeakMap === 'function' ? WeakMap : Map;
var ReactCurrentDispatcher$2 = ReactSharedInternals.ReactCurrentDispatcher,
    ReactCurrentCache = ReactSharedInternals.ReactCurrentCache,
    ReactCurrentOwner$2 = ReactSharedInternals.ReactCurrentOwner,
    ReactCurrentBatchConfig$2 = ReactSharedInternals.ReactCurrentBatchConfig,
    ReactCurrentActQueue$2 = ReactSharedInternals.ReactCurrentActQueue;
var NoContext =
/*             */
0;
var BatchedContext =
/*               */
1;
var RenderContext =
/*         */
2;
var CommitContext =
/*         */
4;
var RootInProgress = 0;
var RootFatalErrored = 1;
var RootErrored = 2;
var RootSuspended = 3;
var RootSuspendedWithDelay = 4;
var RootCompleted = 5;
var RootDidNotComplete = 6; // Describes where we are in the React execution stack

var executionContext = NoContext; // The root we're working on

var workInProgressRoot = null; // The fiber we're working on

var workInProgress = null; // The lanes we're rendering

var workInProgressRootRenderLanes = NoLanes;
var NotSuspended = 0;
var SuspendedOnError = 1;
var SuspendedOnData = 2;
var SuspendedOnImmediate = 3;
var SuspendedOnDeprecatedThrowPromise = 4;
var SuspendedAndReadyToUnwind = 5;
var SuspendedOnHydration = 6; // When this is true, the work-in-progress fiber just suspended (or errored) and
// we've yet to unwind the stack. In some cases, we may yield to the main thread
// after this happens. If the fiber is pinged before we resume, we can retry
// immediately instead of unwinding the stack.

var workInProgressSuspendedReason = NotSuspended;
var workInProgressThrownValue = null; // Whether a ping listener was attached during this render. This is slightly
// different that whether something suspended, because we don't add multiple
// listeners to a promise we've already seen (per root and lane).

var workInProgressRootDidAttachPingListener = false; // A contextual version of workInProgressRootRenderLanes. It is a superset of
// the lanes that we started working on at the root. When we enter a subtree
// that is currently hidden, we add the lanes that would have committed if
// the hidden tree hadn't been deferred. This is modified by the
// HiddenContext module.
//
// Most things in the work loop should deal with workInProgressRootRenderLanes.
// Most things in begin/complete phases should deal with renderLanes.

var renderLanes$1 = NoLanes; // Whether to root completed, errored, suspended, etc.

var workInProgressRootExitStatus = RootInProgress; // A fatal error, if one is thrown

var workInProgressRootFatalError = null; // The work left over by components that were visited during this render. Only
// includes unprocessed updates, not work in bailed out children.

var workInProgressRootSkippedLanes = NoLanes; // Lanes that were updated (in an interleaved event) during this render.

var workInProgressRootInterleavedUpdatedLanes = NoLanes; // Lanes that were updated during the render phase (*not* an interleaved event).

var workInProgressRootPingedLanes = NoLanes; // Errors that are thrown during the render phase.

var workInProgressRootConcurrentErrors = null; // These are errors that we recovered from without surfacing them to the UI.
// We will log them once the tree commits.

var workInProgressRootRecoverableErrors = null; // The most recent time we committed a fallback. This lets us ensure a train
// model where we don't commit new loading states in too quick succession.

var globalMostRecentFallbackTime = 0;
var FALLBACK_THROTTLE_MS = 500; // The absolute time for when we should start giving up on rendering
// more and prefer CPU suspense heuristics instead.

var workInProgressRootRenderTargetTime = Infinity; // How long a render is supposed to take before we start following CPU
// suspense heuristics and opt out of rendering more content.

var RENDER_TIMEOUT_MS = 500;
var workInProgressTransitions = null;

function resetRenderTimer() {
  workInProgressRootRenderTargetTime = now() + RENDER_TIMEOUT_MS;
}

function getRenderTargetTime() {
  return workInProgressRootRenderTargetTime;
}
var hasUncaughtError = false;
var firstUncaughtError = null;
var legacyErrorBoundariesThatAlreadyFailed = null; // Only used when enableProfilerNestedUpdateScheduledHook is true;
var rootDoesHavePassiveEffects = false;
var rootWithPendingPassiveEffects = null;
var pendingPassiveEffectsLanes = NoLanes;
var pendingPassiveProfilerEffects = [];
var pendingPassiveEffectsRemainingLanes = NoLanes;
var pendingPassiveTransitions = null; // Use these to prevent an infinite loop of nested updates

var NESTED_UPDATE_LIMIT = 50;
var nestedUpdateCount = 0;
var rootWithNestedUpdates = null;
// event times as simultaneous, even if the actual clock time has advanced
// between the first and second call.

var currentEventTime = NoTimestamp;
var currentEventTransitionLane = NoLanes;
function getWorkInProgressRoot() {
  return workInProgressRoot;
}
function getWorkInProgressRootRenderLanes() {
  return workInProgressRootRenderLanes;
}
function requestEventTime() {
  if ((executionContext & (RenderContext | CommitContext)) !== NoContext) {
    // We're inside React, so it's fine to read the actual time.
    return now();
  } // We're not inside React, so we may be in the middle of a browser event.


  if (currentEventTime !== NoTimestamp) {
    // Use the same start time for all updates until we enter React again.
    return currentEventTime;
  } // This is the first update since React yielded. Compute a new start time.


  currentEventTime = now();
  return currentEventTime;
}
function requestUpdateLane(fiber) {
  // Special cases
  var mode = fiber.mode;

  if ((mode & ConcurrentMode) === NoMode) {
    return SyncLane;
  } else if ( (executionContext & RenderContext) !== NoContext && workInProgressRootRenderLanes !== NoLanes) {
    // This is a render phase update. These are not officially supported. The
    // old behavior is to give this the same "thread" (lanes) as
    // whatever is currently rendering. So if you call `setState` on a component
    // that happens later in the same render, it will flush. Ideally, we want to
    // remove the special case and treat them as if they came from an
    // interleaved event. Regardless, this pattern is not officially supported.
    // This behavior is only a fallback. The flag only exists until we can roll
    // out the setState warning, since existing code might accidentally rely on
    // the current behavior.
    return pickArbitraryLane(workInProgressRootRenderLanes);
  }

  var isTransition = requestCurrentTransition() !== NoTransition;

  if (isTransition) {
    // updates at the same priority within the same event. To do this, the
    // inputs to the algorithm must be the same.
    //
    // The trick we use is to cache the first of each of these inputs within an
    // event. Then reset the cached values once we can be sure the event is
    // over. Our heuristic for that is whenever we enter a concurrent work loop.


    if (currentEventTransitionLane === NoLane) {
      // All transitions within the same event are assigned the same lane.
      currentEventTransitionLane = claimNextTransitionLane();
    }

    return currentEventTransitionLane;
  } // Updates originating inside certain React methods, like flushSync, have
  // their priority set by tracking it with a context variable.
  //
  // The opaque type returned by the host config is internally a lane, so we can
  // use that directly.
  // TODO: Move this type conversion to the event priority module.


  var updateLane = getCurrentUpdatePriority();

  if (updateLane !== NoLane) {
    return updateLane;
  } // This update originated outside React. Ask the host environment for an
  // appropriate priority, based on the type of event.
  //
  // The opaque type returned by the host config is internally a lane, so we can
  // use that directly.
  // TODO: Move this type conversion to the event priority module.


  var eventLane = getCurrentEventPriority();
  return eventLane;
}

function requestRetryLane(fiber) {
  // This is a fork of `requestUpdateLane` designed specifically for Suspense
  // "retries" — a special update that attempts to flip a Suspense boundary
  // from its placeholder state to its primary/resolved state.
  // Special cases
  var mode = fiber.mode;

  if ((mode & ConcurrentMode) === NoMode) {
    return SyncLane;
  }

  return claimNextRetryLane();
}

function scheduleUpdateOnFiber(root, fiber, lane, eventTime) {
  // finish loading.


  if (workInProgressSuspendedReason === SuspendedOnData && root === workInProgressRoot) {
    // The incoming update might unblock the current render. Interrupt the
    // current attempt and restart from the top.
    prepareFreshStack(root, NoLanes);
    markRootSuspended$1(root, workInProgressRootRenderLanes);
  } // Mark that the root has a pending update.


  markRootUpdated(root, lane, eventTime);

  if ((executionContext & RenderContext) !== NoLanes && root === workInProgressRoot) ; else {
    // This is a normal update, scheduled from outside the render phase. For
    // example, during an input event.
    {
      if (isDevToolsPresent) {
        addFiberToLanesMap(root, fiber, lane);
      }
    }

    if (root === workInProgressRoot) {
      // Received an update to a tree that's in the middle of rendering. Mark
      // that there was an interleaved update work on this root. Unless the
      // `deferRenderPhaseUpdateToNextBatch` flag is off and this is a render
      // phase update. In that case, we don't treat render phase updates as if
      // they were interleaved, for backwards compat reasons.
      if ( (executionContext & RenderContext) === NoContext) {
        workInProgressRootInterleavedUpdatedLanes = mergeLanes(workInProgressRootInterleavedUpdatedLanes, lane);
      }

      if (workInProgressRootExitStatus === RootSuspendedWithDelay) {
        // The root already suspended with a delay, which means this render
        // definitely won't finish. Since we have a new update, let's mark it as
        // suspended now, right before marking the incoming update. This has the
        // effect of interrupting the current render and switching to the update.
        // TODO: Make sure this doesn't override pings that happen while we've
        // already started rendering.
        markRootSuspended$1(root, workInProgressRootRenderLanes);
      }
    }

    ensureRootIsScheduled(root, eventTime);

    if (lane === SyncLane && executionContext === NoContext && (fiber.mode & ConcurrentMode) === NoMode && // Treat `act` as if it's inside `batchedUpdates`, even in legacy mode.
    !(false )) {
      // Flush the synchronous work now, unless we're already working or inside
      // a batch. This is intentionally inside scheduleUpdateOnFiber instead of
      // scheduleCallbackForFiber to preserve the ability to schedule a callback
      // without immediately flushing it. We only do this for user-initiated
      // updates, to preserve historical behavior of legacy mode.
      resetRenderTimer();
      flushSyncCallbacksOnlyInLegacyMode();
    }
  }
}
function scheduleInitialHydrationOnRoot(root, lane, eventTime) {
  // This is a special fork of scheduleUpdateOnFiber that is only used to
  // schedule the initial hydration of a root that has just been created. Most
  // of the stuff in scheduleUpdateOnFiber can be skipped.
  //
  // The main reason for this separate path, though, is to distinguish the
  // initial children from subsequent updates. In fully client-rendered roots
  // (createRoot instead of hydrateRoot), all top-level renders are modeled as
  // updates, but hydration roots are special because the initial render must
  // match what was rendered on the server.
  var current = root.current;
  current.lanes = lane;
  markRootUpdated(root, lane, eventTime);
  ensureRootIsScheduled(root, eventTime);
}
function isUnsafeClassRenderPhaseUpdate(fiber) {
  // Check if this is a render phase update. Only called by class components,
  // which special (deprecated) behavior for UNSAFE_componentWillReceive props.
  return (// TODO: Remove outdated deferRenderPhaseUpdateToNextBatch experiment. We
    // decided not to enable it.
     (executionContext & RenderContext) !== NoContext
  );
} // Use this function to schedule a task for a root. There's only one task per
// root; if a task was already scheduled, we'll check to make sure the priority
// of the existing task is the same as the priority of the next level that the
// root has work on. This function is called on every update, and right before
// exiting a task.

function ensureRootIsScheduled(root, currentTime) {
  var existingCallbackNode = root.callbackNode; // Check if any lanes are being starved by other work. If so, mark them as
  // expired so we know to work on those next.

  markStarvedLanesAsExpired(root, currentTime); // Determine the next lanes to work on, and their priority.

  var nextLanes = getNextLanes(root, root === workInProgressRoot ? workInProgressRootRenderLanes : NoLanes);

  if (nextLanes === NoLanes) {
    // Special case: There's nothing to work on.
    if (existingCallbackNode !== null) {
      cancelCallback$1(existingCallbackNode);
    }

    root.callbackNode = null;
    root.callbackPriority = NoLane;
    return;
  } // We use the highest priority lane to represent the priority of the callback.


  var newCallbackPriority = getHighestPriorityLane(nextLanes); // Check if there's an existing task. We may be able to reuse it.

  var existingCallbackPriority = root.callbackPriority;

  if (existingCallbackPriority === newCallbackPriority && // Special case related to `act`. If the currently scheduled task is a
  // Scheduler task, rather than an `act` task, cancel it and re-scheduled
  // on the `act` queue.
  !(false  )) {


    return;
  }

  if (existingCallbackNode != null) {
    // Cancel the existing callback. We'll schedule a new one below.
    cancelCallback$1(existingCallbackNode);
  } // Schedule a new callback.


  var newCallbackNode;

  if (includesSyncLane(newCallbackPriority)) {
    // Special case: Sync React callbacks are scheduled on a special
    // internal queue
    if (root.tag === LegacyRoot) {

      scheduleLegacySyncCallback(performSyncWorkOnRoot.bind(null, root));
    } else {
      scheduleSyncCallback(performSyncWorkOnRoot.bind(null, root));
    }

    if (supportsMicrotasks) {
      // Flush the queue in a microtask.
      {
        scheduleMicrotask(function () {
          // In Safari, appending an iframe forces microtasks to run.
          // https://github.com/facebook/react/issues/22459
          // We don't support running callbacks in the middle of render
          // or commit so we need to check against that.
          if ((executionContext & (RenderContext | CommitContext)) === NoContext) {
            // Note that this would still prematurely flush the callbacks
            // if this happens outside render or commit phase (e.g. in an event).
            flushSyncCallbacks();
          }
        });
      }
    } else {
      // Flush the queue in an Immediate task.
      scheduleCallback$2(ImmediatePriority, flushSyncCallbacks);
    }

    newCallbackNode = null;
  } else {
    var schedulerPriorityLevel;

    switch (lanesToEventPriority(nextLanes)) {
      case DiscreteEventPriority:
        schedulerPriorityLevel = ImmediatePriority;
        break;

      case ContinuousEventPriority:
        schedulerPriorityLevel = UserBlockingPriority;
        break;

      case DefaultEventPriority:
        schedulerPriorityLevel = NormalPriority;
        break;

      case IdleEventPriority:
        schedulerPriorityLevel = IdlePriority;
        break;

      default:
        schedulerPriorityLevel = NormalPriority;
        break;
    }

    newCallbackNode = scheduleCallback$2(schedulerPriorityLevel, performConcurrentWorkOnRoot.bind(null, root));
  }

  root.callbackPriority = newCallbackPriority;
  root.callbackNode = newCallbackNode;
} // This is the entry point for every concurrent task, i.e. anything that
// goes through Scheduler.


function performConcurrentWorkOnRoot(root, didTimeout) {
  {
    resetNestedUpdateFlag();
  } // Since we know we're in a React event, we can clear the current
  // event time. The next update will compute a new event time.


  currentEventTime = NoTimestamp;
  currentEventTransitionLane = NoLanes;

  if ((executionContext & (RenderContext | CommitContext)) !== NoContext) {
    throw new Error('Should not already be working.');
  } // Flush any pending passive effects before deciding which lanes to work on,
  // in case they schedule additional work.


  var originalCallbackNode = root.callbackNode;
  var didFlushPassiveEffects = flushPassiveEffects();

  if (didFlushPassiveEffects) {
    // Something in the passive effect phase may have canceled the current task.
    // Check if the task node for this root was changed.
    if (root.callbackNode !== originalCallbackNode) {
      // The current task was canceled. Exit. We don't need to call
      // `ensureRootIsScheduled` because the check above implies either that
      // there's a new task, or that there's no remaining work on this root.
      return null;
    }
  } // Determine the next lanes to work on, using the fields stored
  // on the root.


  var lanes = getNextLanes(root, root === workInProgressRoot ? workInProgressRootRenderLanes : NoLanes);

  if (lanes === NoLanes) {
    // Defensive coding. This is never expected to happen.
    return null;
  } // We disable time-slicing in some cases: if the work has been CPU-bound
  // for too long ("expired" work, to prevent starvation), or we're in
  // sync-updates-by-default mode.
  // TODO: We only check `didTimeout` defensively, to account for a Scheduler
  // bug we're still investigating. Once the bug in Scheduler is fixed,
  // we can remove this, since we track expiration ourselves.


  var shouldTimeSlice = !includesBlockingLane(root, lanes) && !includesExpiredLane(root, lanes) && ( !didTimeout);
  var exitStatus = shouldTimeSlice ? renderRootConcurrent(root, lanes) : renderRootSync(root, lanes);

  if (exitStatus !== RootInProgress) {
    if (exitStatus === RootErrored) {
      // If something threw an error, try rendering one more time. We'll
      // render synchronously to block concurrent data mutations, and we'll
      // includes all pending updates are included. If it still fails after
      // the second attempt, we'll give up and commit the resulting tree.
      var originallyAttemptedLanes = lanes;
      var errorRetryLanes = getLanesToRetrySynchronouslyOnError(root, originallyAttemptedLanes);

      if (errorRetryLanes !== NoLanes) {
        lanes = errorRetryLanes;
        exitStatus = recoverFromConcurrentError(root, originallyAttemptedLanes, errorRetryLanes);
      }
    }

    if (exitStatus === RootFatalErrored) {
      var fatalError = workInProgressRootFatalError;
      prepareFreshStack(root, NoLanes);
      markRootSuspended$1(root, lanes);
      ensureRootIsScheduled(root, now());
      throw fatalError;
    }

    if (exitStatus === RootDidNotComplete) {
      // The render unwound without completing the tree. This happens in special
      // cases where need to exit the current render without producing a
      // consistent tree or committing.
      markRootSuspended$1(root, lanes);
    } else {
      // The render completed.
      // Check if this render may have yielded to a concurrent event, and if so,
      // confirm that any newly rendered stores are consistent.
      // TODO: It's possible that even a concurrent render may never have yielded
      // to the main thread, if it was fast enough, or if it expired. We could
      // skip the consistency check in that case, too.
      var renderWasConcurrent = !includesBlockingLane(root, lanes);
      var finishedWork = root.current.alternate;

      if (renderWasConcurrent && !isRenderConsistentWithExternalStores(finishedWork)) {
        // A store was mutated in an interleaved event. Render again,
        // synchronously, to block further mutations.
        exitStatus = renderRootSync(root, lanes); // We need to check again if something threw

        if (exitStatus === RootErrored) {
          var _originallyAttemptedLanes = lanes;

          var _errorRetryLanes = getLanesToRetrySynchronouslyOnError(root, _originallyAttemptedLanes);

          if (_errorRetryLanes !== NoLanes) {
            lanes = _errorRetryLanes;
            exitStatus = recoverFromConcurrentError(root, _originallyAttemptedLanes, _errorRetryLanes); // We assume the tree is now consistent because we didn't yield to any
            // concurrent events.
          }
        }

        if (exitStatus === RootFatalErrored) {
          var _fatalError = workInProgressRootFatalError;
          prepareFreshStack(root, NoLanes);
          markRootSuspended$1(root, lanes);
          ensureRootIsScheduled(root, now());
          throw _fatalError;
        } // FIXME: Need to check for RootDidNotComplete again. The factoring here
        // isn't ideal.

      } // We now have a consistent tree. The next step is either to commit it,
      // or, if something suspended, wait to commit it after a timeout.


      root.finishedWork = finishedWork;
      root.finishedLanes = lanes;
      finishConcurrentRender(root, exitStatus, lanes);
    }
  }

  ensureRootIsScheduled(root, now());

  if (root.callbackNode === originalCallbackNode) {
    // The task node scheduled for this root is the same one that's
    // currently executed. Need to return a continuation.
    if (workInProgressSuspendedReason === SuspendedOnData && workInProgressRoot === root) {
      // Special case: The work loop is currently suspended and waiting for
      // data to resolve. Unschedule the current task.
      //
      // TODO: The factoring is a little weird. Arguably this should be checked
      // in ensureRootIsScheduled instead. I went back and forth, not totally
      // sure yet.
      root.callbackPriority = NoLane;
      root.callbackNode = null;
      return null;
    }

    return performConcurrentWorkOnRoot.bind(null, root);
  }

  return null;
}

function recoverFromConcurrentError(root, originallyAttemptedLanes, errorRetryLanes) {
  // If an error occurred during hydration, discard server response and fall
  // back to client side render.
  // Before rendering again, save the errors from the previous attempt.
  var errorsFromFirstAttempt = workInProgressRootConcurrentErrors;
  var wasRootDehydrated = isRootDehydrated(root);

  if (wasRootDehydrated) {
    // The shell failed to hydrate. Set a flag to force a client rendering
    // during the next attempt. To do this, we call prepareFreshStack now
    // to create the root work-in-progress fiber. This is a bit weird in terms
    // of factoring, because it relies on renderRootSync not calling
    // prepareFreshStack again in the call below, which happens because the
    // root and lanes haven't changed.
    //
    // TODO: I think what we should do is set ForceClientRender inside
    // throwException, like we do for nested Suspense boundaries. The reason
    // it's here instead is so we can switch to the synchronous work loop, too.
    // Something to consider for a future refactor.
    var rootWorkInProgress = prepareFreshStack(root, errorRetryLanes);
    rootWorkInProgress.flags |= ForceClientRender;
  }

  var exitStatus = renderRootSync(root, errorRetryLanes);

  if (exitStatus !== RootErrored) {
    // Successfully finished rendering on retry
    if (workInProgressRootDidAttachPingListener && !wasRootDehydrated) {
      // During the synchronous render, we attached additional ping listeners.
      // This is highly suggestive of an uncached promise (though it's not the
      // only reason this would happen). If it was an uncached promise, then
      // it may have masked a downstream error from ocurring without actually
      // fixing it. Example:
      //
      //    use(Promise.resolve('uncached'))
      //    throw new Error('Oops!')
      //
      // When this happens, there's a conflict between blocking potential
      // concurrent data races and unwrapping uncached promise values. We
      // have to choose one or the other. Because the data race recovery is
      // a last ditch effort, we'll disable it.
      root.errorRecoveryDisabledLanes = mergeLanes(root.errorRecoveryDisabledLanes, originallyAttemptedLanes); // Mark the current render as suspended and force it to restart. Once
      // these lanes finish successfully, we'll re-enable the error recovery
      // mechanism for subsequent updates.

      workInProgressRootInterleavedUpdatedLanes |= originallyAttemptedLanes;
      return RootSuspendedWithDelay;
    } // The errors from the failed first attempt have been recovered. Add
    // them to the collection of recoverable errors. We'll log them in the
    // commit phase.


    var errorsFromSecondAttempt = workInProgressRootRecoverableErrors;
    workInProgressRootRecoverableErrors = errorsFromFirstAttempt; // The errors from the second attempt should be queued after the errors
    // from the first attempt, to preserve the causal sequence.

    if (errorsFromSecondAttempt !== null) {
      queueRecoverableErrors(errorsFromSecondAttempt);
    }
  }

  return exitStatus;
}

function queueRecoverableErrors(errors) {
  if (workInProgressRootRecoverableErrors === null) {
    workInProgressRootRecoverableErrors = errors;
  } else {
    // $FlowFixMe[method-unbinding]
    workInProgressRootRecoverableErrors.push.apply(workInProgressRootRecoverableErrors, errors);
  }
}

function finishConcurrentRender(root, exitStatus, lanes) {
  switch (exitStatus) {
    case RootInProgress:
    case RootFatalErrored:
      {
        throw new Error('Root did not complete. This is a bug in React.');
      }
    // Flow knows about invariant, so it complains if I add a break
    // statement, but eslint doesn't know about invariant, so it complains
    // if I do. eslint-disable-next-line no-fallthrough

    case RootErrored:
      {
        // We should have already attempted to retry this tree. If we reached
        // this point, it errored again. Commit it.
        commitRoot(root, workInProgressRootRecoverableErrors, workInProgressTransitions);
        break;
      }

    case RootSuspended:
      {
        markRootSuspended$1(root, lanes); // We have an acceptable loading state. We need to figure out if we
        // should immediately commit it or wait a bit.

        if (includesOnlyRetries(lanes) && // do not delay if we're inside an act() scope
        !shouldForceFlushFallbacksInDEV()) {
          // This render only included retries, no updates. Throttle committing
          // retries so that we don't show too many loading states too quickly.
          var msUntilTimeout = globalMostRecentFallbackTime + FALLBACK_THROTTLE_MS - now(); // Don't bother with a very short suspense time.

          if (msUntilTimeout > 10) {
            var nextLanes = getNextLanes(root, NoLanes);

            if (nextLanes !== NoLanes) {
              // There's additional work on this root.
              break;
            } // The render is suspended, it hasn't timed out, and there's no
            // lower priority work to do. Instead of committing the fallback
            // immediately, wait for more data to arrive.


            root.timeoutHandle = scheduleTimeout(commitRoot.bind(null, root, workInProgressRootRecoverableErrors, workInProgressTransitions), msUntilTimeout);
            break;
          }
        } // The work expired. Commit immediately.


        commitRoot(root, workInProgressRootRecoverableErrors, workInProgressTransitions);
        break;
      }

    case RootSuspendedWithDelay:
      {
        markRootSuspended$1(root, lanes);

        if (includesOnlyTransitions(lanes)) {
          // This is a transition, so we should exit without committing a
          // placeholder and without scheduling a timeout. Delay indefinitely
          // until we receive more data.
          break;
        }

        {
          // This is not a transition, but we did trigger an avoided state.
          // Schedule a placeholder to display after a short delay, using the Just
          // Noticeable Difference.
          // TODO: Is the JND optimization worth the added complexity? If this is
          // the only reason we track the event time, then probably not.
          // Consider removing.
          var mostRecentEventTime = getMostRecentEventTime(root, lanes);
          var eventTimeMs = mostRecentEventTime;
          var timeElapsedMs = now() - eventTimeMs;

          var _msUntilTimeout = jnd(timeElapsedMs) - timeElapsedMs; // Don't bother with a very short suspense time.


          if (_msUntilTimeout > 10) {
            // Instead of committing the fallback immediately, wait for more data
            // to arrive.
            root.timeoutHandle = scheduleTimeout(commitRoot.bind(null, root, workInProgressRootRecoverableErrors, workInProgressTransitions), _msUntilTimeout);
            break;
          }
        } // Commit the placeholder.


        commitRoot(root, workInProgressRootRecoverableErrors, workInProgressTransitions);
        break;
      }

    case RootCompleted:
      {
        // The work completed. Ready to commit.
        commitRoot(root, workInProgressRootRecoverableErrors, workInProgressTransitions);
        break;
      }

    default:
      {
        throw new Error('Unknown root exit status.');
      }
  }
}

function isRenderConsistentWithExternalStores(finishedWork) {
  // Search the rendered tree for external store reads, and check whether the
  // stores were mutated in a concurrent event. Intentionally using an iterative
  // loop instead of recursion so we can exit early.
  var node = finishedWork;

  while (true) {
    if (node.flags & StoreConsistency) {
      var updateQueue = node.updateQueue;

      if (updateQueue !== null) {
        var checks = updateQueue.stores;

        if (checks !== null) {
          for (var i = 0; i < checks.length; i++) {
            var check = checks[i];
            var getSnapshot = check.getSnapshot;
            var renderedValue = check.value;

            try {
              if (!objectIs(getSnapshot(), renderedValue)) {
                // Found an inconsistent store.
                return false;
              }
            } catch (error) {
              // If `getSnapshot` throws, return `false`. This will schedule
              // a re-render, and the error will be rethrown during render.
              return false;
            }
          }
        }
      }
    }

    var child = node.child;

    if (node.subtreeFlags & StoreConsistency && child !== null) {
      child.return = node;
      node = child;
      continue;
    }

    if (node === finishedWork) {
      return true;
    }

    while (node.sibling === null) {
      if (node.return === null || node.return === finishedWork) {
        return true;
      }

      node = node.return;
    }

    node.sibling.return = node.return;
    node = node.sibling;
  } // Flow doesn't know this is unreachable, but eslint does
  // eslint-disable-next-line no-unreachable


  return true;
}

function markRootSuspended$1(root, suspendedLanes) {
  // When suspending, we should always exclude lanes that were pinged or (more
  // rarely, since we try to avoid it) updated during the render phase.
  // TODO: Lol maybe there's a better way to factor this besides this
  // obnoxiously named function :)
  suspendedLanes = removeLanes(suspendedLanes, workInProgressRootPingedLanes);
  suspendedLanes = removeLanes(suspendedLanes, workInProgressRootInterleavedUpdatedLanes); // $FlowFixMe[incompatible-call] found when upgrading Flow

  markRootSuspended(root, suspendedLanes);
} // This is the entry point for synchronous tasks that don't go
// through Scheduler


function performSyncWorkOnRoot(root) {
  {
    syncNestedUpdateFlag();
  }

  if ((executionContext & (RenderContext | CommitContext)) !== NoContext) {
    throw new Error('Should not already be working.');
  }

  flushPassiveEffects();
  var lanes = getNextLanes(root, NoLanes);

  if (!includesSyncLane(lanes)) {
    // There's no remaining sync work left.
    ensureRootIsScheduled(root, now());
    return null;
  }

  var exitStatus = renderRootSync(root, lanes);

  if (root.tag !== LegacyRoot && exitStatus === RootErrored) {
    // If something threw an error, try rendering one more time. We'll render
    // synchronously to block concurrent data mutations, and we'll includes
    // all pending updates are included. If it still fails after the second
    // attempt, we'll give up and commit the resulting tree.
    var originallyAttemptedLanes = lanes;
    var errorRetryLanes = getLanesToRetrySynchronouslyOnError(root, originallyAttemptedLanes);

    if (errorRetryLanes !== NoLanes) {
      lanes = errorRetryLanes;
      exitStatus = recoverFromConcurrentError(root, originallyAttemptedLanes, errorRetryLanes);
    }
  }

  if (exitStatus === RootFatalErrored) {
    var fatalError = workInProgressRootFatalError;
    prepareFreshStack(root, NoLanes);
    markRootSuspended$1(root, lanes);
    ensureRootIsScheduled(root, now());
    throw fatalError;
  }

  if (exitStatus === RootDidNotComplete) {
    // The render unwound without completing the tree. This happens in special
    // cases where need to exit the current render without producing a
    // consistent tree or committing.
    markRootSuspended$1(root, lanes);
    ensureRootIsScheduled(root, now());
    return null;
  } // We now have a consistent tree. Because this is a sync render, we
  // will commit it even if something suspended.


  var finishedWork = root.current.alternate;
  root.finishedWork = finishedWork;
  root.finishedLanes = lanes;
  commitRoot(root, workInProgressRootRecoverableErrors, workInProgressTransitions); // Before exiting, make sure there's a callback scheduled for the next
  // pending level.

  ensureRootIsScheduled(root, now());
  return null;
}

function flushRoot(root, lanes) {
  if (lanes !== NoLanes) {
    markRootEntangled(root, mergeLanes(lanes, SyncLane));
    ensureRootIsScheduled(root, now());

    if ((executionContext & (RenderContext | CommitContext)) === NoContext) {
      resetRenderTimer();
      flushSyncCallbacks();
    }
  }
}
function getExecutionContext() {
  return executionContext;
}
function deferredUpdates(fn) {
  var previousPriority = getCurrentUpdatePriority();
  var prevTransition = ReactCurrentBatchConfig$2.transition;

  try {
    ReactCurrentBatchConfig$2.transition = null;
    setCurrentUpdatePriority(DefaultEventPriority);
    return fn();
  } finally {
    setCurrentUpdatePriority(previousPriority);
    ReactCurrentBatchConfig$2.transition = prevTransition;
  }
}
function batchedUpdates(fn, a) {
  var prevExecutionContext = executionContext;
  executionContext |= BatchedContext;

  try {
    return fn(a);
  } finally {
    executionContext = prevExecutionContext; // If there were legacy sync updates, flush them at the end of the outer
    // most batchedUpdates-like method.

    if (executionContext === NoContext && // Treat `act` as if it's inside `batchedUpdates`, even in legacy mode.
    !(false )) {
      resetRenderTimer();
      flushSyncCallbacksOnlyInLegacyMode();
    }
  }
}
function discreteUpdates(fn, a, b, c, d) {
  var previousPriority = getCurrentUpdatePriority();
  var prevTransition = ReactCurrentBatchConfig$2.transition;

  try {
    ReactCurrentBatchConfig$2.transition = null;
    setCurrentUpdatePriority(DiscreteEventPriority);
    return fn(a, b, c, d);
  } finally {
    setCurrentUpdatePriority(previousPriority);
    ReactCurrentBatchConfig$2.transition = prevTransition;

    if (executionContext === NoContext) {
      resetRenderTimer();
    }
  }
} // Overload the definition to the two valid signatures.
// Warning, this opts-out of checking the function body.
// eslint-disable-next-line no-unused-vars
// eslint-disable-next-line no-redeclare
// eslint-disable-next-line no-redeclare

function flushSync(fn) {
  // In legacy mode, we flush pending passive effects at the beginning of the
  // next event, not at the end of the previous one.
  if (rootWithPendingPassiveEffects !== null && rootWithPendingPassiveEffects.tag === LegacyRoot && (executionContext & (RenderContext | CommitContext)) === NoContext) {
    flushPassiveEffects();
  }

  var prevExecutionContext = executionContext;
  executionContext |= BatchedContext;
  var prevTransition = ReactCurrentBatchConfig$2.transition;
  var previousPriority = getCurrentUpdatePriority();

  try {
    ReactCurrentBatchConfig$2.transition = null;
    setCurrentUpdatePriority(DiscreteEventPriority);

    if (fn) {
      return fn();
    } else {
      return undefined;
    }
  } finally {
    setCurrentUpdatePriority(previousPriority);
    ReactCurrentBatchConfig$2.transition = prevTransition;
    executionContext = prevExecutionContext; // Flush the immediate callbacks that were scheduled during this batch.
    // Note that this will happen even if batchedUpdates is higher up
    // the stack.

    if ((executionContext & (RenderContext | CommitContext)) === NoContext) {
      flushSyncCallbacks();
    }
  }
}
function isAlreadyRendering() {
  // Used by the renderer to print a warning if certain APIs are called from
  // the wrong context.
  return false ;
}
function isInvalidExecutionContextForEventFunction() {
  // Used to throw if certain APIs are called from the wrong context.
  return (executionContext & RenderContext) !== NoContext;
}
function flushControlled(fn) {
  var prevExecutionContext = executionContext;
  executionContext |= BatchedContext;
  var prevTransition = ReactCurrentBatchConfig$2.transition;
  var previousPriority = getCurrentUpdatePriority();

  try {
    ReactCurrentBatchConfig$2.transition = null;
    setCurrentUpdatePriority(DiscreteEventPriority);
    fn();
  } finally {
    setCurrentUpdatePriority(previousPriority);
    ReactCurrentBatchConfig$2.transition = prevTransition;
    executionContext = prevExecutionContext;

    if (executionContext === NoContext) {
      // Flush the immediate callbacks that were scheduled during this batch
      resetRenderTimer();
      flushSyncCallbacks();
    }
  }
} // This is called by the HiddenContext module when we enter or leave a
// hidden subtree. The stack logic is managed there because that's the only
// place that ever modifies it. Which module it lives in doesn't matter for
// performance because this function will get inlined regardless

function setRenderLanes(subtreeRenderLanes) {
  renderLanes$1 = subtreeRenderLanes;
}
function getRenderLanes() {
  return renderLanes$1;
}

function resetWorkInProgressStack() {
  if (workInProgress === null) return;
  var interruptedWork;

  if (workInProgressSuspendedReason === NotSuspended) {
    // Normal case. Work-in-progress hasn't started yet. Unwind all
    // its parents.
    interruptedWork = workInProgress.return;
  } else {
    // Work-in-progress is in suspended state. Reset the work loop and unwind
    // both the suspended fiber and all its parents.
    resetSuspendedWorkLoopOnUnwind();
    interruptedWork = workInProgress;
  }

  while (interruptedWork !== null) {
    var current = interruptedWork.alternate;
    unwindInterruptedWork(current, interruptedWork);
    interruptedWork = interruptedWork.return;
  }

  workInProgress = null;
}

function prepareFreshStack(root, lanes) {
  root.finishedWork = null;
  root.finishedLanes = NoLanes;
  var timeoutHandle = root.timeoutHandle;

  if (timeoutHandle !== noTimeout) {
    // The root previous suspended and scheduled a timeout to commit a fallback
    // state. Now that we have additional work, cancel the timeout.
    root.timeoutHandle = noTimeout; // $FlowFixMe Complains noTimeout is not a TimeoutID, despite the check above

    cancelTimeout(timeoutHandle);
  }

  resetWorkInProgressStack();
  workInProgressRoot = root;
  var rootWorkInProgress = createWorkInProgress(root.current, null);
  workInProgress = rootWorkInProgress;
  workInProgressRootRenderLanes = renderLanes$1 = lanes;
  workInProgressSuspendedReason = NotSuspended;
  workInProgressThrownValue = null;
  workInProgressRootDidAttachPingListener = false;
  workInProgressRootExitStatus = RootInProgress;
  workInProgressRootFatalError = null;
  workInProgressRootSkippedLanes = NoLanes;
  workInProgressRootInterleavedUpdatedLanes = NoLanes;
  workInProgressRootPingedLanes = NoLanes;
  workInProgressRootConcurrentErrors = null;
  workInProgressRootRecoverableErrors = null;
  finishQueueingConcurrentUpdates();

  return rootWorkInProgress;
}

function resetSuspendedWorkLoopOnUnwind() {
  // Reset module-level state that was set during the render phase.
  resetContextDependencies();
  resetHooksOnUnwind();
}

function handleThrow(root, thrownValue) {
  // A component threw an exception. Usually this is because it suspended, but
  // it also includes regular program errors.
  //
  // We're either going to unwind the stack to show a Suspense or error
  // boundary, or we're going to replay the component again. Like after a
  // promise resolves.
  //
  // Until we decide whether we're going to unwind or replay, we should preserve
  // the current state of the work loop without resetting anything.
  //
  // If we do decide to unwind the stack, module-level variables will be reset
  // in resetSuspendedWorkLoopOnUnwind.
  // These should be reset immediately because they're only supposed to be set
  // when React is executing user code.
  resetHooksAfterThrow();
  ReactCurrentOwner$2.current = null;

  if (thrownValue === SuspenseException) {
    // This is a special type of exception used for Suspense. For historical
    // reasons, the rest of the Suspense implementation expects the thrown value
    // to be a thenable, because before `use` existed that was the (unstable)
    // API for suspending. This implementation detail can change later, once we
    // deprecate the old API in favor of `use`.
    thrownValue = getSuspendedThenable();
    workInProgressSuspendedReason = shouldAttemptToSuspendUntilDataResolves() ? SuspendedOnData : SuspendedOnImmediate;
  } else if (thrownValue === SelectiveHydrationException) {
    // An update flowed into a dehydrated boundary. Before we can apply the
    // update, we need to finish hydrating. Interrupt the work-in-progress
    // render so we can restart at the hydration lane.
    //
    // The ideal implementation would be able to switch contexts without
    // unwinding the current stack.
    //
    // We could name this something more general but as of now it's the only
    // case where we think this should happen.
    workInProgressSuspendedReason = SuspendedOnHydration;
  } else {
    // This is a regular error.
    var isWakeable = thrownValue !== null && typeof thrownValue === 'object' && // $FlowFixMe[method-unbinding]
    typeof thrownValue.then === 'function';
    workInProgressSuspendedReason = isWakeable ? // A wakeable object was thrown by a legacy Suspense implementation.
    // This has slightly different behavior than suspending with `use`.
    SuspendedOnDeprecatedThrowPromise : // This is a regular error. If something earlier in the component already
    // suspended, we must clear the thenable state to unblock the work loop.
    SuspendedOnError;
  }

  workInProgressThrownValue = thrownValue;
  var erroredWork = workInProgress;

  if (erroredWork === null) {
    // This is a fatal error
    workInProgressRootExitStatus = RootFatalErrored;
    workInProgressRootFatalError = thrownValue;
    return;
  }

  if ( erroredWork.mode & ProfileMode) {
    // Record the time spent rendering before an error was thrown. This
    // avoids inaccurate Profiler durations in the case of a
    // suspended render.
    stopProfilerTimerIfRunningAndRecordDelta(erroredWork, true);
  }

  {
    markComponentRenderStopped();

    if (workInProgressSuspendedReason !== SuspendedOnError) {
      var wakeable = thrownValue;
      markComponentSuspended(erroredWork, wakeable, workInProgressRootRenderLanes);
    } else {
      markComponentErrored(erroredWork, thrownValue, workInProgressRootRenderLanes);
    }
  }
}

function shouldAttemptToSuspendUntilDataResolves() {
  // Check if there are other pending updates that might possibly unblock this
  // component from suspending. This mirrors the check in
  // renderDidSuspendDelayIfPossible. We should attempt to unify them somehow.
  // TODO: Consider unwinding immediately, using the
  // SuspendedOnHydration mechanism.
  if (includesNonIdleWork(workInProgressRootSkippedLanes) || includesNonIdleWork(workInProgressRootInterleavedUpdatedLanes)) {
    // Suspend normally. renderDidSuspendDelayIfPossible will handle
    // interrupting the work loop.
    return false;
  } // TODO: We should be able to remove the equivalent check in
  // finishConcurrentRender, and rely just on this one.


  if (includesOnlyTransitions(workInProgressRootRenderLanes)) {
    // If we're rendering inside the "shell" of the app, it's better to suspend
    // rendering and wait for the data to resolve. Otherwise, we should switch
    // to a fallback and continue rendering.
    return getShellBoundary() === null;
  }

  var handler = getSuspenseHandler();

  if (handler === null) ; else {
    if (includesOnlyRetries(workInProgressRootRenderLanes)) {
      // During a retry, we can suspend rendering if the nearest Suspense boundary
      // is the boundary of the "shell", because we're guaranteed not to block
      // any new content from appearing.
      return handler === getShellBoundary();
    }
  } // For all other Lanes besides Transitions and Retries, we should not wait
  // for the data to load.
  // TODO: We should wait during Offscreen prerendering, too.


  return false;
}

function pushDispatcher(container) {
  prepareRendererToRender(container);
  var prevDispatcher = ReactCurrentDispatcher$2.current;
  ReactCurrentDispatcher$2.current = ContextOnlyDispatcher;

  if (prevDispatcher === null) {
    // The React isomorphic package does not include a default dispatcher.
    // Instead the first renderer will lazily attach one, in order to give
    // nicer error messages.
    return ContextOnlyDispatcher;
  } else {
    return prevDispatcher;
  }
}

function popDispatcher(prevDispatcher) {
  resetRendererAfterRender();
  ReactCurrentDispatcher$2.current = prevDispatcher;
}

function pushCacheDispatcher() {
  {
    var prevCacheDispatcher = ReactCurrentCache.current;
    ReactCurrentCache.current = DefaultCacheDispatcher;
    return prevCacheDispatcher;
  }
}

function popCacheDispatcher(prevCacheDispatcher) {
  {
    ReactCurrentCache.current = prevCacheDispatcher;
  }
}

function markCommitTimeOfFallback() {
  globalMostRecentFallbackTime = now();
}
function markSkippedUpdateLanes(lane) {
  workInProgressRootSkippedLanes = mergeLanes(lane, workInProgressRootSkippedLanes);
}
function renderDidSuspend() {
  if (workInProgressRootExitStatus === RootInProgress) {
    workInProgressRootExitStatus = RootSuspended;
  }
}
function renderDidSuspendDelayIfPossible() {
  workInProgressRootExitStatus = RootSuspendedWithDelay; // Check if there are updates that we skipped tree that might have unblocked
  // this render.

  if (workInProgressRoot !== null && (includesNonIdleWork(workInProgressRootSkippedLanes) || includesNonIdleWork(workInProgressRootInterleavedUpdatedLanes))) {
    // Mark the current render as suspended so that we switch to working on
    // the updates that were skipped. Usually we only suspend at the end of
    // the render phase.
    // TODO: We should probably always mark the root as suspended immediately
    // (inside this function), since by suspending at the end of the render
    // phase introduces a potential mistake where we suspend lanes that were
    // pinged or updated while we were rendering.
    // TODO: Consider unwinding immediately, using the
    // SuspendedOnHydration mechanism.
    markRootSuspended$1(workInProgressRoot, workInProgressRootRenderLanes);
  }
}
function renderDidError(error) {
  if (workInProgressRootExitStatus !== RootSuspendedWithDelay) {
    workInProgressRootExitStatus = RootErrored;
  }

  if (workInProgressRootConcurrentErrors === null) {
    workInProgressRootConcurrentErrors = [error];
  } else {
    workInProgressRootConcurrentErrors.push(error);
  }
} // Called during render to determine if anything has suspended.
// Returns false if we're not sure.

function renderHasNotSuspendedYet() {
  // If something errored or completed, we can't really be sure,
  // so those are false.
  return workInProgressRootExitStatus === RootInProgress;
} // TODO: Over time, this function and renderRootConcurrent have become more
// and more similar. Not sure it makes sense to maintain forked paths. Consider
// unifying them again.

function renderRootSync(root, lanes) {
  var prevExecutionContext = executionContext;
  executionContext |= RenderContext;
  var prevDispatcher = pushDispatcher(root.containerInfo);
  var prevCacheDispatcher = pushCacheDispatcher(); // If the root or lanes have changed, throw out the existing stack
  // and prepare a fresh one. Otherwise we'll continue where we left off.

  if (workInProgressRoot !== root || workInProgressRootRenderLanes !== lanes) {
    {
      if (isDevToolsPresent) {
        var memoizedUpdaters = root.memoizedUpdaters;

        if (memoizedUpdaters.size > 0) {
          restorePendingUpdaters(root, workInProgressRootRenderLanes);
          memoizedUpdaters.clear();
        } // At this point, move Fibers that scheduled the upcoming work from the Map to the Set.
        // If we bailout on this work, we'll move them back (like above).
        // It's important to move them now in case the work spawns more work at the same priority with different updaters.
        // That way we can keep the current update and future updates separate.


        movePendingFibersToMemoized(root, lanes);
      }
    }

    workInProgressTransitions = getTransitionsForLanes();
    prepareFreshStack(root, lanes);
  }

  {
    markRenderStarted(lanes);
  }

  outer: do {
    try {
      if (workInProgressSuspendedReason !== NotSuspended && workInProgress !== null) {
        // The work loop is suspended. During a synchronous render, we don't
        // yield to the main thread. Immediately unwind the stack. This will
        // trigger either a fallback or an error boundary.
        // TODO: For discrete and "default" updates (anything that's not
        // flushSync), we want to wait for the microtasks the flush before
        // unwinding. Will probably implement this using renderRootConcurrent,
        // or merge renderRootSync and renderRootConcurrent into the same
        // function and fork the behavior some other way.
        var unitOfWork = workInProgress;
        var thrownValue = workInProgressThrownValue;

        switch (workInProgressSuspendedReason) {
          case SuspendedOnHydration:
            {
              // Selective hydration. An update flowed into a dehydrated tree.
              // Interrupt the current render so the work loop can switch to the
              // hydration lane.
              resetWorkInProgressStack();
              workInProgressRootExitStatus = RootDidNotComplete;
              break outer;
            }

          default:
            {
              // Continue with the normal work loop.
              workInProgressSuspendedReason = NotSuspended;
              workInProgressThrownValue = null;
              unwindSuspendedUnitOfWork(unitOfWork, thrownValue);
              break;
            }
        }
      }

      workLoopSync();
      break;
    } catch (thrownValue) {
      handleThrow(root, thrownValue);
    }
  } while (true);

  resetContextDependencies();
  executionContext = prevExecutionContext;
  popDispatcher(prevDispatcher);
  popCacheDispatcher(prevCacheDispatcher);

  if (workInProgress !== null) {
    // This is a sync render, so we should have finished the whole tree.
    throw new Error('Cannot commit an incomplete root. This error is likely caused by a ' + 'bug in React. Please file an issue.');
  }

  {
    markRenderStopped();
  } // Set this to null to indicate there's no in-progress render.


  workInProgressRoot = null;
  workInProgressRootRenderLanes = NoLanes; // It's safe to process the queue now that the render phase is complete.

  finishQueueingConcurrentUpdates();
  return workInProgressRootExitStatus;
} // The work loop is an extremely hot path. Tell Closure not to inline it.

/** @noinline */


function workLoopSync() {
  // Perform work without checking if we need to yield between fiber.
  while (workInProgress !== null) {
    performUnitOfWork(workInProgress);
  }
}

function renderRootConcurrent(root, lanes) {
  var prevExecutionContext = executionContext;
  executionContext |= RenderContext;
  var prevDispatcher = pushDispatcher(root.containerInfo);
  var prevCacheDispatcher = pushCacheDispatcher(); // If the root or lanes have changed, throw out the existing stack
  // and prepare a fresh one. Otherwise we'll continue where we left off.

  if (workInProgressRoot !== root || workInProgressRootRenderLanes !== lanes) {
    {
      if (isDevToolsPresent) {
        var memoizedUpdaters = root.memoizedUpdaters;

        if (memoizedUpdaters.size > 0) {
          restorePendingUpdaters(root, workInProgressRootRenderLanes);
          memoizedUpdaters.clear();
        } // At this point, move Fibers that scheduled the upcoming work from the Map to the Set.
        // If we bailout on this work, we'll move them back (like above).
        // It's important to move them now in case the work spawns more work at the same priority with different updaters.
        // That way we can keep the current update and future updates separate.


        movePendingFibersToMemoized(root, lanes);
      }
    }

    workInProgressTransitions = getTransitionsForLanes();
    resetRenderTimer();
    prepareFreshStack(root, lanes);
  }

  {
    markRenderStarted(lanes);
  }

  outer: do {
    try {
      if (workInProgressSuspendedReason !== NotSuspended && workInProgress !== null) {
        // The work loop is suspended. We need to either unwind the stack or
        // replay the suspended component.
        var unitOfWork = workInProgress;
        var thrownValue = workInProgressThrownValue;

        switch (workInProgressSuspendedReason) {
          case SuspendedOnError:
            {
              // Unwind then continue with the normal work loop.
              workInProgressSuspendedReason = NotSuspended;
              workInProgressThrownValue = null;
              unwindSuspendedUnitOfWork(unitOfWork, thrownValue);
              break;
            }

          case SuspendedOnData:
            {
              var thenable = thrownValue;

              if (isThenableResolved(thenable)) {
                // The data resolved. Try rendering the component again.
                workInProgressSuspendedReason = NotSuspended;
                workInProgressThrownValue = null;
                replaySuspendedUnitOfWork(unitOfWork);
                break;
              } // The work loop is suspended on data. We should wait for it to
              // resolve before continuing to render.
              // TODO: Handle the case where the promise resolves synchronously.
              // Usually this is handled when we instrument the promise to add a
              // `status` field, but if the promise already has a status, we won't
              // have added a listener until right here.


              var onResolution = function () {
                ensureRootIsScheduled(root, now());
              };

              thenable.then(onResolution, onResolution);
              break outer;
            }

          case SuspendedOnImmediate:
            {
              // If this fiber just suspended, it's possible the data is already
              // cached. Yield to the main thread to give it a chance to ping. If
              // it does, we can retry immediately without unwinding the stack.
              workInProgressSuspendedReason = SuspendedAndReadyToUnwind;
              break outer;
            }

          case SuspendedAndReadyToUnwind:
            {
              var _thenable = thrownValue;

              if (isThenableResolved(_thenable)) {
                // The data resolved. Try rendering the component again.
                workInProgressSuspendedReason = NotSuspended;
                workInProgressThrownValue = null;
                replaySuspendedUnitOfWork(unitOfWork);
              } else {
                // Otherwise, unwind then continue with the normal work loop.
                workInProgressSuspendedReason = NotSuspended;
                workInProgressThrownValue = null;
                unwindSuspendedUnitOfWork(unitOfWork, thrownValue);
              }

              break;
            }

          case SuspendedOnDeprecatedThrowPromise:
            {
              // Suspended by an old implementation that uses the `throw promise`
              // pattern. The newer replaying behavior can cause subtle issues
              // like infinite ping loops. So we maintain the old behavior and
              // always unwind.
              workInProgressSuspendedReason = NotSuspended;
              workInProgressThrownValue = null;
              unwindSuspendedUnitOfWork(unitOfWork, thrownValue);
              break;
            }

          case SuspendedOnHydration:
            {
              // Selective hydration. An update flowed into a dehydrated tree.
              // Interrupt the current render so the work loop can switch to the
              // hydration lane.
              resetWorkInProgressStack();
              workInProgressRootExitStatus = RootDidNotComplete;
              break outer;
            }

          default:
            {
              throw new Error('Unexpected SuspendedReason. This is a bug in React.');
            }
        }
      }

      workLoopConcurrent();
      break;
    } catch (thrownValue) {
      handleThrow(root, thrownValue);
    }
  } while (true);

  resetContextDependencies();
  popDispatcher(prevDispatcher);
  popCacheDispatcher(prevCacheDispatcher);
  executionContext = prevExecutionContext;


  if (workInProgress !== null) {
    // Still work remaining.
    {
      markRenderYielded();
    }

    return RootInProgress;
  } else {
    // Completed the tree.
    {
      markRenderStopped();
    } // Set this to null to indicate there's no in-progress render.


    workInProgressRoot = null;
    workInProgressRootRenderLanes = NoLanes; // It's safe to process the queue now that the render phase is complete.

    finishQueueingConcurrentUpdates(); // Return the final exit status.

    return workInProgressRootExitStatus;
  }
}
/** @noinline */


function workLoopConcurrent() {
  // Perform work until Scheduler asks us to yield
  while (workInProgress !== null && !shouldYield()) {
    // $FlowFixMe[incompatible-call] found when upgrading Flow
    performUnitOfWork(workInProgress);
  }
}

function performUnitOfWork(unitOfWork) {
  // The current, flushed, state of this fiber is the alternate. Ideally
  // nothing should rely on this, but relying on it here means that we don't
  // need an additional field on the work in progress.
  var current = unitOfWork.alternate;
  var next;

  if ( (unitOfWork.mode & ProfileMode) !== NoMode) {
    startProfilerTimer(unitOfWork);
    next = beginWork$1(current, unitOfWork, renderLanes$1);
    stopProfilerTimerIfRunningAndRecordDelta(unitOfWork, true);
  } else {
    next = beginWork$1(current, unitOfWork, renderLanes$1);
  }
  unitOfWork.memoizedProps = unitOfWork.pendingProps;

  if (next === null) {
    // If this doesn't spawn new work, complete the current work.
    completeUnitOfWork(unitOfWork);
  } else {
    workInProgress = next;
  }

  ReactCurrentOwner$2.current = null;
}

function replaySuspendedUnitOfWork(unitOfWork) {
  // This is a fork of performUnitOfWork specifcally for replaying a fiber that
  // just suspended.
  //
  var current = unitOfWork.alternate;
  var next;
  var isProfilingMode =  (unitOfWork.mode & ProfileMode) !== NoMode;

  if (isProfilingMode) {
    startProfilerTimer(unitOfWork);
  }

  switch (unitOfWork.tag) {
    case IndeterminateComponent:
      {
        // Because it suspended with `use`, we can assume it's a
        // function component.
        unitOfWork.tag = FunctionComponent; // Fallthrough to the next branch.
      }
    // eslint-disable-next-line no-fallthrough

    case FunctionComponent:
    case ForwardRef:
      {
        // Resolve `defaultProps`. This logic is copied from `beginWork`.
        // TODO: Consider moving this switch statement into that module. Also,
        // could maybe use this as an opportunity to say `use` doesn't work with
        // `defaultProps` :)
        var Component = unitOfWork.type;
        var unresolvedProps = unitOfWork.pendingProps;
        var resolvedProps = unitOfWork.elementType === Component ? unresolvedProps : resolveDefaultProps(Component, unresolvedProps);
        next = replayFunctionComponent(current, unitOfWork, resolvedProps, Component, workInProgressRootRenderLanes);
        break;
      }

    case SimpleMemoComponent:
      {
        var _Component = unitOfWork.type;
        var nextProps = unitOfWork.pendingProps;
        next = replayFunctionComponent(current, unitOfWork, nextProps, _Component, workInProgressRootRenderLanes);
        break;
      }

    default:
      {

        resetSuspendedWorkLoopOnUnwind();
        unwindInterruptedWork(current, unitOfWork);
        unitOfWork = workInProgress = resetWorkInProgress(unitOfWork, renderLanes$1);
        next = beginWork$1(current, unitOfWork, renderLanes$1);
        break;
      }
  }

  if (isProfilingMode) {
    stopProfilerTimerIfRunningAndRecordDelta(unitOfWork, true);
  } // The begin phase finished successfully without suspending. Return to the
  unitOfWork.memoizedProps = unitOfWork.pendingProps;

  if (next === null) {
    // If this doesn't spawn new work, complete the current work.
    completeUnitOfWork(unitOfWork);
  } else {
    workInProgress = next;
  }

  ReactCurrentOwner$2.current = null;
}

function unwindSuspendedUnitOfWork(unitOfWork, thrownValue) {
  // This is a fork of performUnitOfWork specifcally for unwinding a fiber
  // that threw an exception.
  //
  // Return to the normal work loop. This will unwind the stack, and potentially
  // result in showing a fallback.
  resetSuspendedWorkLoopOnUnwind();
  var returnFiber = unitOfWork.return;

  if (returnFiber === null || workInProgressRoot === null) {
    // Expected to be working on a non-root fiber. This is a fatal error
    // because there's no ancestor that can handle it; the root is
    // supposed to capture all errors that weren't caught by an error
    // boundary.
    workInProgressRootExitStatus = RootFatalErrored;
    workInProgressRootFatalError = thrownValue; // Set `workInProgress` to null. This represents advancing to the next
    // sibling, or the parent if there are no siblings. But since the root
    // has no siblings nor a parent, we set it to null. Usually this is
    // handled by `completeUnitOfWork` or `unwindWork`, but since we're
    // intentionally not calling those, we need set it here.
    // TODO: Consider calling `unwindWork` to pop the contexts.

    workInProgress = null;
    return;
  }

  try {
    // Find and mark the nearest Suspense or error boundary that can handle
    // this "exception".
    throwException(workInProgressRoot, returnFiber, unitOfWork, thrownValue, workInProgressRootRenderLanes);
  } catch (error) {
    // We had trouble processing the error. An example of this happening is
    // when accessing the `componentDidCatch` property of an error boundary
    // throws an error. A weird edge case. There's a regression test for this.
    // To prevent an infinite loop, bubble the error up to the next parent.
    workInProgress = returnFiber;
    throw error;
  } // Return to the normal work loop.


  completeUnitOfWork(unitOfWork);
}

function completeUnitOfWork(unitOfWork) {
  // Attempt to complete the current unit of work, then move to the next
  // sibling. If there are no more siblings, return to the parent fiber.
  var completedWork = unitOfWork;

  do {
    // The current, flushed, state of this fiber is the alternate. Ideally
    // nothing should rely on this, but relying on it here means that we don't
    // need an additional field on the work in progress.
    var current = completedWork.alternate;
    var returnFiber = completedWork.return; // Check if the work completed or if something threw.

    if ((completedWork.flags & Incomplete) === NoFlags) {
      var next = void 0;

      if ( (completedWork.mode & ProfileMode) === NoMode) {
        next = completeWork(current, completedWork, renderLanes$1);
      } else {
        startProfilerTimer(completedWork);
        next = completeWork(current, completedWork, renderLanes$1); // Update render duration assuming we didn't error.

        stopProfilerTimerIfRunningAndRecordDelta(completedWork, false);
      }

      if (next !== null) {
        // Completing this fiber spawned new work. Work on that next.
        workInProgress = next;
        return;
      }
    } else {
      // This fiber did not complete because something threw. Pop values off
      // the stack without entering the complete phase. If this is a boundary,
      // capture values if possible.
      var _next = unwindWork(current, completedWork); // Because this fiber did not complete, don't reset its lanes.


      if (_next !== null) {
        // If completing this work spawned new work, do that next. We'll come
        // back here again.
        // Since we're restarting, remove anything that is not a host effect
        // from the effect tag.
        _next.flags &= HostEffectMask;
        workInProgress = _next;
        return;
      }

      if ( (completedWork.mode & ProfileMode) !== NoMode) {
        // Record the render duration for the fiber that errored.
        stopProfilerTimerIfRunningAndRecordDelta(completedWork, false); // Include the time spent working on failed children before continuing.

        var actualDuration = completedWork.actualDuration;
        var child = completedWork.child;

        while (child !== null) {
          // $FlowFixMe[unsafe-addition] addition with possible null/undefined value
          actualDuration += child.actualDuration;
          child = child.sibling;
        }

        completedWork.actualDuration = actualDuration;
      }

      if (returnFiber !== null) {
        // Mark the parent fiber as incomplete and clear its subtree flags.
        returnFiber.flags |= Incomplete;
        returnFiber.subtreeFlags = NoFlags;
        returnFiber.deletions = null;
      } else {
        // We've unwound all the way to the root.
        workInProgressRootExitStatus = RootDidNotComplete;
        workInProgress = null;
        return;
      }
    }

    var siblingFiber = completedWork.sibling;

    if (siblingFiber !== null) {
      // If there is more work to do in this returnFiber, do that next.
      workInProgress = siblingFiber;
      return;
    } // Otherwise, return to the parent
    // $FlowFixMe[incompatible-type] we bail out when we get a null


    completedWork = returnFiber; // Update the next thing we're working on in case something throws.

    workInProgress = completedWork;
  } while (completedWork !== null); // We've reached the root.


  if (workInProgressRootExitStatus === RootInProgress) {
    workInProgressRootExitStatus = RootCompleted;
  }
}

function commitRoot(root, recoverableErrors, transitions) {
  // TODO: This no longer makes any sense. We already wrap the mutation and
  // layout phases. Should be able to remove.
  var previousUpdateLanePriority = getCurrentUpdatePriority();
  var prevTransition = ReactCurrentBatchConfig$2.transition;

  try {
    ReactCurrentBatchConfig$2.transition = null;
    setCurrentUpdatePriority(DiscreteEventPriority);
    commitRootImpl(root, recoverableErrors, transitions, previousUpdateLanePriority);
  } finally {
    ReactCurrentBatchConfig$2.transition = prevTransition;
    setCurrentUpdatePriority(previousUpdateLanePriority);
  }

  return null;
}

function commitRootImpl(root, recoverableErrors, transitions, renderPriorityLevel) {
  do {
    // `flushPassiveEffects` will call `flushSyncUpdateQueue` at the end, which
    // means `flushPassiveEffects` will sometimes result in additional
    // passive effects. So we need to keep flushing in a loop until there are
    // no more pending effects.
    // TODO: Might be better if `flushPassiveEffects` did not automatically
    // flush synchronous work at the end, to avoid factoring hazards like this.
    flushPassiveEffects();
  } while (rootWithPendingPassiveEffects !== null);

  if ((executionContext & (RenderContext | CommitContext)) !== NoContext) {
    throw new Error('Should not already be working.');
  }

  var finishedWork = root.finishedWork;
  var lanes = root.finishedLanes;

  {
    markCommitStarted(lanes);
  }

  if (finishedWork === null) {

    {
      markCommitStopped();
    }

    return null;
  }

  root.finishedWork = null;
  root.finishedLanes = NoLanes;

  if (finishedWork === root.current) {
    throw new Error('Cannot commit the same tree as before. This error is likely caused by ' + 'a bug in React. Please file an issue.');
  } // commitRoot never returns a continuation; it always finishes synchronously.
  // So we can clear these now to allow a new callback to be scheduled.


  root.callbackNode = null;
  root.callbackPriority = NoLane; // Check which lanes no longer have any work scheduled on them, and mark
  // those as finished.

  var remainingLanes = mergeLanes(finishedWork.lanes, finishedWork.childLanes); // Make sure to account for lanes that were updated by a concurrent event
  // during the render phase; don't mark them as finished.

  var concurrentlyUpdatedLanes = getConcurrentlyUpdatedLanes();
  remainingLanes = mergeLanes(remainingLanes, concurrentlyUpdatedLanes);
  markRootFinished(root, remainingLanes);

  if (root === workInProgressRoot) {
    // We can reset these now that they are finished.
    workInProgressRoot = null;
    workInProgress = null;
    workInProgressRootRenderLanes = NoLanes;
  } // If there are pending passive effects, schedule a callback to process them.
  // Do this as early as possible, so it is queued before anything else that
  // might get scheduled in the commit phase. (See #16714.)
  // TODO: Delete all other places that schedule the passive effect callback
  // They're redundant.


  if ((finishedWork.subtreeFlags & PassiveMask) !== NoFlags || (finishedWork.flags & PassiveMask) !== NoFlags) {
    if (!rootDoesHavePassiveEffects) {
      rootDoesHavePassiveEffects = true;
      pendingPassiveEffectsRemainingLanes = remainingLanes; // workInProgressTransitions might be overwritten, so we want
      // to store it in pendingPassiveTransitions until they get processed
      // We need to pass this through as an argument to commitRoot
      // because workInProgressTransitions might have changed between
      // the previous render and commit if we throttle the commit
      // with setTimeout

      pendingPassiveTransitions = transitions;
      scheduleCallback$2(NormalPriority, function () {
        flushPassiveEffects(); // This render triggered passive effects: release the root cache pool
        // *after* passive effects fire to avoid freeing a cache pool that may
        // be referenced by a node in the tree (HostRoot, Cache boundary etc)

        return null;
      });
    }
  } // Check if there are any effects in the whole tree.
  // TODO: This is left over from the effect list implementation, where we had
  // to check for the existence of `firstEffect` to satisfy Flow. I think the
  // only other reason this optimization exists is because it affects profiling.
  // Reconsider whether this is necessary.


  var subtreeHasEffects = (finishedWork.subtreeFlags & (BeforeMutationMask | MutationMask | LayoutMask | PassiveMask)) !== NoFlags;
  var rootHasEffect = (finishedWork.flags & (BeforeMutationMask | MutationMask | LayoutMask | PassiveMask)) !== NoFlags;

  if (subtreeHasEffects || rootHasEffect) {
    var prevTransition = ReactCurrentBatchConfig$2.transition;
    ReactCurrentBatchConfig$2.transition = null;
    var previousPriority = getCurrentUpdatePriority();
    setCurrentUpdatePriority(DiscreteEventPriority);
    var prevExecutionContext = executionContext;
    executionContext |= CommitContext; // Reset this to null before calling lifecycles

    ReactCurrentOwner$2.current = null; // The commit phase is broken into several sub-phases. We do a separate pass
    // of the effect list for each phase: all mutation effects come before all
    // layout effects, and so on.
    // The first phase a "before mutation" phase. We use this phase to read the
    // state of the host tree right before we mutate it. This is where
    // getSnapshotBeforeUpdate is called.

    var shouldFireAfterActiveInstanceBlur = commitBeforeMutationEffects(root, finishedWork);

    {
      // Mark the current commit time to be shared by all Profilers in this
      // batch. This enables them to be grouped later.
      recordCommitTime();
    }


    commitMutationEffects(root, finishedWork, lanes);

    resetAfterCommit(root.containerInfo); // The work-in-progress tree is now the current tree. This must come after
    // the mutation phase, so that the previous tree is still current during
    // componentWillUnmount, but before the layout phase, so that the finished
    // work is current during componentDidMount/Update.

    root.current = finishedWork; // The next phase is the layout phase, where we call effects that read

    {
      markLayoutEffectsStarted(lanes);
    }

    commitLayoutEffects(finishedWork, root, lanes);

    {
      markLayoutEffectsStopped();
    }
    // opportunity to paint.


    requestPaint();
    executionContext = prevExecutionContext; // Reset the priority to the previous non-sync value.

    setCurrentUpdatePriority(previousPriority);
    ReactCurrentBatchConfig$2.transition = prevTransition;
  } else {
    // No effects.
    root.current = finishedWork; // Measure these anyway so the flamegraph explicitly shows that there were
    // no effects.
    // TODO: Maybe there's a better way to report this.

    {
      recordCommitTime();
    }
  }

  if (rootDoesHavePassiveEffects) {
    // This commit has passive effects. Stash a reference to them. But don't
    // schedule a callback until after flushing layout work.
    rootDoesHavePassiveEffects = false;
    rootWithPendingPassiveEffects = root;
    pendingPassiveEffectsLanes = lanes;
  } else {
    // There were no passive effects, so we can immediately release the cache
    // pool for this render.
    releaseRootPooledCache(root, remainingLanes);
  } // Read this again, since an effect might have updated it


  remainingLanes = root.pendingLanes; // Check if there's remaining work on this root
  // TODO: This is part of the `componentDidCatch` implementation. Its purpose
  // is to detect whether something might have called setState inside
  // `componentDidCatch`. The mechanism is known to be flawed because `setState`
  // inside `componentDidCatch` is itself flawed — that's why we recommend
  // `getDerivedStateFromError` instead. However, it could be improved by
  // checking if remainingLanes includes Sync work, instead of whether there's
  // any work remaining at all (which would also include stuff like Suspense
  // retries or transitions). It's been like this for a while, though, so fixing
  // it probably isn't that urgent.

  if (remainingLanes === NoLanes) {
    // If there's no remaining work, we can clear the set of already failed
    // error boundaries.
    legacyErrorBoundariesThatAlreadyFailed = null;
  }

  onCommitRoot(finishedWork.stateNode, renderPriorityLevel);

  {
    if (isDevToolsPresent) {
      root.memoizedUpdaters.clear();
    }
  }
  // additional work on this root is scheduled.


  ensureRootIsScheduled(root, now());

  if (recoverableErrors !== null) {
    // There were errors during this render, but recovered from them without
    // needing to surface it to the UI. We log them here.
    var onRecoverableError = root.onRecoverableError;

    for (var i = 0; i < recoverableErrors.length; i++) {
      var recoverableError = recoverableErrors[i];
      var errorInfo = makeErrorInfo(recoverableError.digest, recoverableError.stack);
      onRecoverableError(recoverableError.value, errorInfo);
    }
  }

  if (hasUncaughtError) {
    hasUncaughtError = false;
    var error = firstUncaughtError;
    firstUncaughtError = null;
    throw error;
  } // If the passive effects are the result of a discrete render, flush them
  // synchronously at the end of the current task so that the result is
  // immediately observable. Otherwise, we assume that they are not
  // order-dependent and do not need to be observed by external systems, so we
  // can wait until after paint.
  // TODO: We can optimize this by not scheduling the callback earlier. Since we
  // currently schedule the callback in multiple places, will wait until those
  // are consolidated.


  if (includesSyncLane(pendingPassiveEffectsLanes) && root.tag !== LegacyRoot) {
    flushPassiveEffects();
  } // Read this again, since a passive effect might have updated it


  remainingLanes = root.pendingLanes;

  if (includesSyncLane(remainingLanes)) {
    {
      markNestedUpdateScheduled();
    } // Count the number of times the root synchronously re-renders without
    // finishing. If there are too many, it indicates an infinite update loop.


    if (root === rootWithNestedUpdates) {
      nestedUpdateCount++;
    } else {
      nestedUpdateCount = 0;
      rootWithNestedUpdates = root;
    }
  } else {
    nestedUpdateCount = 0;
  } // If layout work was scheduled, flush it now.


  flushSyncCallbacks();

  {
    markCommitStopped();
  }

  return null;
}

function makeErrorInfo(digest, componentStack) {
  {
    return {
      digest: digest,
      componentStack: componentStack
    };
  }
}

function releaseRootPooledCache(root, remainingLanes) {
  {
    var pooledCacheLanes = root.pooledCacheLanes &= remainingLanes;

    if (pooledCacheLanes === NoLanes) {
      // None of the remaining work relies on the cache pool. Clear it so
      // subsequent requests get a new cache
      var pooledCache = root.pooledCache;

      if (pooledCache != null) {
        root.pooledCache = null;
        releaseCache(pooledCache);
      }
    }
  }
}

function flushPassiveEffects() {
  // Returns whether passive effects were flushed.
  // TODO: Combine this check with the one in flushPassiveEFfectsImpl. We should
  // probably just combine the two functions. I believe they were only separate
  // in the first place because we used to wrap it with
  // `Scheduler.runWithPriority`, which accepts a function. But now we track the
  // priority within React itself, so we can mutate the variable directly.
  if (rootWithPendingPassiveEffects !== null) {
    // Cache the root since rootWithPendingPassiveEffects is cleared in
    // flushPassiveEffectsImpl
    var root = rootWithPendingPassiveEffects; // Cache and clear the remaining lanes flag; it must be reset since this
    // method can be called from various places, not always from commitRoot
    // where the remaining lanes are known

    var remainingLanes = pendingPassiveEffectsRemainingLanes;
    pendingPassiveEffectsRemainingLanes = NoLanes;
    var renderPriority = lanesToEventPriority(pendingPassiveEffectsLanes);
    var priority = lowerEventPriority(DefaultEventPriority, renderPriority);
    var prevTransition = ReactCurrentBatchConfig$2.transition;
    var previousPriority = getCurrentUpdatePriority();

    try {
      ReactCurrentBatchConfig$2.transition = null;
      setCurrentUpdatePriority(priority);
      return flushPassiveEffectsImpl();
    } finally {
      setCurrentUpdatePriority(previousPriority);
      ReactCurrentBatchConfig$2.transition = prevTransition; // Once passive effects have run for the tree - giving components a
      // chance to retain cache instances they use - release the pooled
      // cache at the root (if there is one)

      releaseRootPooledCache(root, remainingLanes);
    }
  }

  return false;
}
function enqueuePendingPassiveProfilerEffect(fiber) {
  {
    pendingPassiveProfilerEffects.push(fiber);

    if (!rootDoesHavePassiveEffects) {
      rootDoesHavePassiveEffects = true;
      scheduleCallback$2(NormalPriority, function () {
        flushPassiveEffects();
        return null;
      });
    }
  }
}

function flushPassiveEffectsImpl() {
  if (rootWithPendingPassiveEffects === null) {
    return false;
  } // Cache and clear the transitions flag


  var transitions = pendingPassiveTransitions;
  pendingPassiveTransitions = null;
  var root = rootWithPendingPassiveEffects;
  var lanes = pendingPassiveEffectsLanes;
  rootWithPendingPassiveEffects = null; // TODO: This is sometimes out of sync with rootWithPendingPassiveEffects.
  // Figure out why and fix it. It's not causing any known issues (probably
  // because it's only used for profiling), but it's a refactor hazard.

  pendingPassiveEffectsLanes = NoLanes;

  if ((executionContext & (RenderContext | CommitContext)) !== NoContext) {
    throw new Error('Cannot flush passive effects while already rendering.');
  }

  {
    markPassiveEffectsStarted(lanes);
  }

  var prevExecutionContext = executionContext;
  executionContext |= CommitContext;
  commitPassiveUnmountEffects(root.current);
  commitPassiveMountEffects(root, root.current, lanes, transitions); // TODO: Move to commitPassiveMountEffects

  {
    var profilerEffects = pendingPassiveProfilerEffects;
    pendingPassiveProfilerEffects = [];

    for (var i = 0; i < profilerEffects.length; i++) {
      var fiber = profilerEffects[i];
      commitPassiveEffectDurations(root, fiber);
    }
  }

  {
    markPassiveEffectsStopped();
  }

  executionContext = prevExecutionContext;
  flushSyncCallbacks();


  onPostCommitRoot(root);

  {
    var stateNode = root.current.stateNode;
    stateNode.effectDuration = 0;
    stateNode.passiveEffectDuration = 0;
  }

  return true;
}

function isAlreadyFailedLegacyErrorBoundary(instance) {
  return legacyErrorBoundariesThatAlreadyFailed !== null && legacyErrorBoundariesThatAlreadyFailed.has(instance);
}
function markLegacyErrorBoundaryAsFailed(instance) {
  if (legacyErrorBoundariesThatAlreadyFailed === null) {
    legacyErrorBoundariesThatAlreadyFailed = new Set([instance]);
  } else {
    legacyErrorBoundariesThatAlreadyFailed.add(instance);
  }
}

function prepareToThrowUncaughtError(error) {
  if (!hasUncaughtError) {
    hasUncaughtError = true;
    firstUncaughtError = error;
  }
}

var onUncaughtError = prepareToThrowUncaughtError;

function captureCommitPhaseErrorOnRoot(rootFiber, sourceFiber, error) {
  var errorInfo = createCapturedValueAtFiber(error, sourceFiber);
  var update = createRootErrorUpdate(rootFiber, errorInfo, SyncLane);
  var root = enqueueUpdate$1(rootFiber, update, SyncLane);
  var eventTime = requestEventTime();

  if (root !== null) {
    markRootUpdated(root, SyncLane, eventTime);
    ensureRootIsScheduled(root, eventTime);
  }
}

function captureCommitPhaseError(sourceFiber, nearestMountedAncestor, error) {

  if (sourceFiber.tag === HostRoot) {
    // Error was thrown at the root. There is no parent, so the root
    // itself should capture it.
    captureCommitPhaseErrorOnRoot(sourceFiber, sourceFiber, error);
    return;
  }

  var fiber = null;

  {
    fiber = nearestMountedAncestor;
  }

  while (fiber !== null) {
    if (fiber.tag === HostRoot) {
      captureCommitPhaseErrorOnRoot(fiber, sourceFiber, error);
      return;
    } else if (fiber.tag === ClassComponent) {
      var ctor = fiber.type;
      var instance = fiber.stateNode;

      if (typeof ctor.getDerivedStateFromError === 'function' || typeof instance.componentDidCatch === 'function' && !isAlreadyFailedLegacyErrorBoundary(instance)) {
        var errorInfo = createCapturedValueAtFiber(error, sourceFiber);
        var update = createClassErrorUpdate(fiber, errorInfo, SyncLane);
        var root = enqueueUpdate$1(fiber, update, SyncLane);
        var eventTime = requestEventTime();

        if (root !== null) {
          markRootUpdated(root, SyncLane, eventTime);
          ensureRootIsScheduled(root, eventTime);
        }

        return;
      }
    }

    fiber = fiber.return;
  }
}
function attachPingListener(root, wakeable, lanes) {
  // Attach a ping listener
  //
  // The data might resolve before we have a chance to commit the fallback. Or,
  // in the case of a refresh, we'll never commit a fallback. So we need to
  // attach a listener now. When it resolves ("pings"), we can decide whether to
  // try rendering the tree again.
  //
  // Only attach a listener if one does not already exist for the lanes
  // we're currently rendering (which acts like a "thread ID" here).
  //
  // We only need to do this in concurrent mode. Legacy Suspense always
  // commits fallbacks synchronously, so there are no pings.
  var pingCache = root.pingCache;
  var threadIDs;

  if (pingCache === null) {
    pingCache = root.pingCache = new PossiblyWeakMap();
    threadIDs = new Set();
    pingCache.set(wakeable, threadIDs);
  } else {
    threadIDs = pingCache.get(wakeable);

    if (threadIDs === undefined) {
      threadIDs = new Set();
      pingCache.set(wakeable, threadIDs);
    }
  }

  if (!threadIDs.has(lanes)) {
    workInProgressRootDidAttachPingListener = true; // Memoize using the thread ID to prevent redundant listeners.

    threadIDs.add(lanes);
    var ping = pingSuspendedRoot.bind(null, root, wakeable, lanes);

    {
      if (isDevToolsPresent) {
        // If we have pending work still, restore the original updaters
        restorePendingUpdaters(root, lanes);
      }
    }

    wakeable.then(ping, ping);
  }
}

function pingSuspendedRoot(root, wakeable, pingedLanes) {
  var pingCache = root.pingCache;

  if (pingCache !== null) {
    // The wakeable resolved, so we no longer need to memoize, because it will
    // never be thrown again.
    pingCache.delete(wakeable);
  }

  var eventTime = requestEventTime();
  markRootPinged(root, pingedLanes);

  if (workInProgressRoot === root && isSubsetOfLanes(workInProgressRootRenderLanes, pingedLanes)) {
    // Received a ping at the same priority level at which we're currently
    // rendering. We might want to restart this render. This should mirror
    // the logic of whether or not a root suspends once it completes.
    // TODO: If we're rendering sync either due to Sync, Batched or expired,
    // we should probably never restart.
    // If we're suspended with delay, or if it's a retry, we'll always suspend
    // so we can always restart.
    if (workInProgressRootExitStatus === RootSuspendedWithDelay || workInProgressRootExitStatus === RootSuspended && includesOnlyRetries(workInProgressRootRenderLanes) && now() - globalMostRecentFallbackTime < FALLBACK_THROTTLE_MS) {
      // Force a restart from the root by unwinding the stack. Unless this is
      // being called from the render phase, because that would cause a crash.
      if ((executionContext & RenderContext) === NoContext) {
        prepareFreshStack(root, NoLanes);
      }
    } else {
      // Even though we can't restart right now, we might get an
      // opportunity later. So we mark this render as having a ping.
      workInProgressRootPingedLanes = mergeLanes(workInProgressRootPingedLanes, pingedLanes);
    }
  }

  ensureRootIsScheduled(root, eventTime);
}

function retryTimedOutBoundary(boundaryFiber, retryLane) {
  // The boundary fiber (a Suspense component or SuspenseList component)
  // previously was rendered in its fallback state. One of the promises that
  // suspended it has resolved, which means at least part of the tree was
  // likely unblocked. Try rendering again, at a new lanes.
  if (retryLane === NoLane) {
    // TODO: Assign this to `suspenseState.retryLane`? to avoid
    // unnecessary entanglement?
    retryLane = requestRetryLane(boundaryFiber);
  } // TODO: Special case idle priority?


  var eventTime = requestEventTime();
  var root = enqueueConcurrentRenderForLane(boundaryFiber, retryLane);

  if (root !== null) {
    markRootUpdated(root, retryLane, eventTime);
    ensureRootIsScheduled(root, eventTime);
  }
}

function retryDehydratedSuspenseBoundary(boundaryFiber) {
  var suspenseState = boundaryFiber.memoizedState;
  var retryLane = NoLane;

  if (suspenseState !== null) {
    retryLane = suspenseState.retryLane;
  }

  retryTimedOutBoundary(boundaryFiber, retryLane);
}
function resolveRetryWakeable(boundaryFiber, wakeable) {
  var retryLane = NoLane; // Default

  var retryCache;

  switch (boundaryFiber.tag) {
    case SuspenseComponent:
      retryCache = boundaryFiber.stateNode;
      var suspenseState = boundaryFiber.memoizedState;

      if (suspenseState !== null) {
        retryLane = suspenseState.retryLane;
      }

      break;

    case SuspenseListComponent:
      retryCache = boundaryFiber.stateNode;
      break;

    case OffscreenComponent:
      {
        var instance = boundaryFiber.stateNode; // $FlowFixMe[incompatible-type] found when upgrading Flow

        retryCache = instance._retryCache;
        break;
      }

    default:
      throw new Error('Pinged unknown suspense boundary type. ' + 'This is probably a bug in React.');
  }

  if (retryCache !== null) {
    // The wakeable resolved, so we no longer need to memoize, because it will
    // never be thrown again.
    retryCache.delete(wakeable);
  }

  retryTimedOutBoundary(boundaryFiber, retryLane);
} // Computes the next Just Noticeable Difference (JND) boundary.
// The theory is that a person can't tell the difference between small differences in time.
// Therefore, if we wait a bit longer than necessary that won't translate to a noticeable
// difference in the experience. However, waiting for longer might mean that we can avoid
// showing an intermediate loading state. The longer we have already waited, the harder it
// is to tell small differences in time. Therefore, the longer we've already waited,
// the longer we can wait additionally. At some point we have to give up though.
// We pick a train model where the next boundary commits at a consistent schedule.
// These particular numbers are vague estimates. We expect to adjust them based on research.

function jnd(timeElapsed) {
  return timeElapsed < 120 ? 120 : timeElapsed < 480 ? 480 : timeElapsed < 1080 ? 1080 : timeElapsed < 1920 ? 1920 : timeElapsed < 3000 ? 3000 : timeElapsed < 4320 ? 4320 : ceil(timeElapsed / 1960) * 1960;
}

function throwIfInfiniteUpdateLoopDetected() {
  if (nestedUpdateCount > NESTED_UPDATE_LIMIT) {
    nestedUpdateCount = 0;
    rootWithNestedUpdates = null;
    throw new Error('Maximum update depth exceeded. This can happen when a component ' + 'repeatedly calls setState inside componentWillUpdate or ' + 'componentDidUpdate. React limits the number of nested updates to ' + 'prevent infinite loops.');
  }
}
var beginWork$1;

{
  beginWork$1 = beginWork;
}

function restorePendingUpdaters(root, lanes) {
  {
    if (isDevToolsPresent) {
      var memoizedUpdaters = root.memoizedUpdaters;
      memoizedUpdaters.forEach(function (schedulingFiber) {
        addFiberToLanesMap(root, schedulingFiber, lanes);
      }); // This function intentionally does not clear memoized updaters.
      // Those may still be relevant to the current commit
      // and a future one (e.g. Suspense).
    }
  }
}

function scheduleCallback$2(priorityLevel, callback) {
  {
    // In production, always call Scheduler. This function will be stripped out.
    return scheduleCallback(priorityLevel, callback);
  }
}

function cancelCallback$1(callbackNode) {


  return cancelCallback(callbackNode);
}

function shouldForceFlushFallbacksInDEV() {
  // Never force flush in production. This function should get stripped out.
  return false ;
}

function FiberNode(tag, pendingProps, key, mode) {
  // Instance
  this.tag = tag;
  this.key = key;
  this.elementType = null;
  this.type = null;
  this.stateNode = null; // Fiber

  this.return = null;
  this.child = null;
  this.sibling = null;
  this.index = 0;
  this.ref = null;
  this.refCleanup = null;
  this.pendingProps = pendingProps;
  this.memoizedProps = null;
  this.updateQueue = null;
  this.memoizedState = null;
  this.dependencies = null;
  this.mode = mode; // Effects

  this.flags = NoFlags;
  this.subtreeFlags = NoFlags;
  this.deletions = null;
  this.lanes = NoLanes;
  this.childLanes = NoLanes;
  this.alternate = null;

  {
    // Note: The following is done to avoid a v8 performance cliff.
    //
    // Initializing the fields below to smis and later updating them with
    // double values will cause Fibers to end up having separate shapes.
    // This behavior/bug has something to do with Object.preventExtension().
    // Fortunately this only impacts DEV builds.
    // Unfortunately it makes React unusably slow for some applications.
    // To work around this, initialize the fields below with doubles.
    //
    // Learn more about this here:
    // https://github.com/facebook/react/issues/14365
    // https://bugs.chromium.org/p/v8/issues/detail?id=8538
    this.actualDuration = Number.NaN;
    this.actualStartTime = Number.NaN;
    this.selfBaseDuration = Number.NaN;
    this.treeBaseDuration = Number.NaN; // It's okay to replace the initial doubles with smis after initialization.
    // This won't trigger the performance cliff mentioned above,
    // and it simplifies other profiler code (including DevTools).

    this.actualDuration = 0;
    this.actualStartTime = -1;
    this.selfBaseDuration = 0;
    this.treeBaseDuration = 0;
  }
} // This is a constructor function, rather than a POJO constructor, still
// please ensure we do the following:
// 1) Nobody should add any instance methods on this. Instance methods can be
//    more difficult to predict when they get optimized and they are almost
//    never inlined properly in static compilers.
// 2) Nobody should rely on `instanceof Fiber` for type testing. We should
//    always know when it is a fiber.
// 3) We might want to experiment with using numeric keys since they are easier
//    to optimize in a non-JIT environment.
// 4) We can easily go from a constructor to a createFiber object literal if that
//    is faster.
// 5) It should be easy to port this to a C struct and keep a C implementation
//    compatible.


var createFiber = function (tag, pendingProps, key, mode) {
  // $FlowFixMe: the shapes are exact here but Flow doesn't like constructors
  return new FiberNode(tag, pendingProps, key, mode);
};

function shouldConstruct(Component) {
  var prototype = Component.prototype;
  return !!(prototype && prototype.isReactComponent);
}

function isSimpleFunctionComponent(type) {
  return typeof type === 'function' && !shouldConstruct(type) && type.defaultProps === undefined;
}
function resolveLazyComponentTag(Component) {
  if (typeof Component === 'function') {
    return shouldConstruct(Component) ? ClassComponent : FunctionComponent;
  } else if (Component !== undefined && Component !== null) {
    var $$typeof = Component.$$typeof;

    if ($$typeof === REACT_FORWARD_REF_TYPE) {
      return ForwardRef;
    }

    if ($$typeof === REACT_MEMO_TYPE) {
      return MemoComponent;
    }
  }

  return IndeterminateComponent;
} // This is used to create an alternate fiber to do work on.

function createWorkInProgress(current, pendingProps) {
  var workInProgress = current.alternate;

  if (workInProgress === null) {
    // We use a double buffering pooling technique because we know that we'll
    // only ever need at most two versions of a tree. We pool the "other" unused
    // node that we're free to reuse. This is lazily created to avoid allocating
    // extra objects for things that are never updated. It also allow us to
    // reclaim the extra memory if needed.
    workInProgress = createFiber(current.tag, pendingProps, current.key, current.mode);
    workInProgress.elementType = current.elementType;
    workInProgress.type = current.type;
    workInProgress.stateNode = current.stateNode;

    workInProgress.alternate = current;
    current.alternate = workInProgress;
  } else {
    workInProgress.pendingProps = pendingProps; // Needed because Blocks store data on type.

    workInProgress.type = current.type; // We already have an alternate.
    // Reset the effect tag.

    workInProgress.flags = NoFlags; // The effects are no longer valid.

    workInProgress.subtreeFlags = NoFlags;
    workInProgress.deletions = null;

    {
      // We intentionally reset, rather than copy, actualDuration & actualStartTime.
      // This prevents time from endlessly accumulating in new commits.
      // This has the downside of resetting values for different priority renders,
      // But works for yielding (the common case) and should support resuming.
      workInProgress.actualDuration = 0;
      workInProgress.actualStartTime = -1;
    }
  } // Reset all effects except static ones.
  // Static effects are not specific to a render.


  workInProgress.flags = current.flags & StaticMask;
  workInProgress.childLanes = current.childLanes;
  workInProgress.lanes = current.lanes;
  workInProgress.child = current.child;
  workInProgress.memoizedProps = current.memoizedProps;
  workInProgress.memoizedState = current.memoizedState;
  workInProgress.updateQueue = current.updateQueue; // Clone the dependencies object. This is mutated during the render phase, so
  // it cannot be shared with the current fiber.

  var currentDependencies = current.dependencies;
  workInProgress.dependencies = currentDependencies === null ? null : {
    lanes: currentDependencies.lanes,
    firstContext: currentDependencies.firstContext
  }; // These will be overridden during the parent's reconciliation

  workInProgress.sibling = current.sibling;
  workInProgress.index = current.index;
  workInProgress.ref = current.ref;
  workInProgress.refCleanup = current.refCleanup;

  {
    workInProgress.selfBaseDuration = current.selfBaseDuration;
    workInProgress.treeBaseDuration = current.treeBaseDuration;
  }

  return workInProgress;
} // Used to reuse a Fiber for a second pass.

function resetWorkInProgress(workInProgress, renderLanes) {
  // This resets the Fiber to what createFiber or createWorkInProgress would
  // have set the values to before during the first pass. Ideally this wouldn't
  // be necessary but unfortunately many code paths reads from the workInProgress
  // when they should be reading from current and writing to workInProgress.
  // We assume pendingProps, index, key, ref, return are still untouched to
  // avoid doing another reconciliation.
  // Reset the effect flags but keep any Placement tags, since that's something
  // that child fiber is setting, not the reconciliation.
  workInProgress.flags &= StaticMask | Placement; // The effects are no longer valid.

  var current = workInProgress.alternate;

  if (current === null) {
    // Reset to createFiber's initial values.
    workInProgress.childLanes = NoLanes;
    workInProgress.lanes = renderLanes;
    workInProgress.child = null;
    workInProgress.subtreeFlags = NoFlags;
    workInProgress.memoizedProps = null;
    workInProgress.memoizedState = null;
    workInProgress.updateQueue = null;
    workInProgress.dependencies = null;
    workInProgress.stateNode = null;

    {
      // Note: We don't reset the actualTime counts. It's useful to accumulate
      // actual time across multiple render passes.
      workInProgress.selfBaseDuration = 0;
      workInProgress.treeBaseDuration = 0;
    }
  } else {
    // Reset to the cloned values that createWorkInProgress would've.
    workInProgress.childLanes = current.childLanes;
    workInProgress.lanes = current.lanes;
    workInProgress.child = current.child;
    workInProgress.subtreeFlags = NoFlags;
    workInProgress.deletions = null;
    workInProgress.memoizedProps = current.memoizedProps;
    workInProgress.memoizedState = current.memoizedState;
    workInProgress.updateQueue = current.updateQueue; // Needed because Blocks store data on type.

    workInProgress.type = current.type; // Clone the dependencies object. This is mutated during the render phase, so
    // it cannot be shared with the current fiber.

    var currentDependencies = current.dependencies;
    workInProgress.dependencies = currentDependencies === null ? null : {
      lanes: currentDependencies.lanes,
      firstContext: currentDependencies.firstContext
    };

    {
      // Note: We don't reset the actualTime counts. It's useful to accumulate
      // actual time across multiple render passes.
      workInProgress.selfBaseDuration = current.selfBaseDuration;
      workInProgress.treeBaseDuration = current.treeBaseDuration;
    }
  }

  return workInProgress;
}
function createHostRootFiber(tag, isStrictMode, concurrentUpdatesByDefaultOverride) {
  var mode;

  if (tag === ConcurrentRoot) {
    mode = ConcurrentMode;

    if (isStrictMode === true || createRootStrictEffectsByDefault) {
      mode |= StrictLegacyMode | StrictEffectsMode;
    }
  } else {
    mode = NoMode;
  }

  if ( isDevToolsPresent) {
    // Always collect profile timings when DevTools are present.
    // This enables DevTools to start capturing timing at any point–
    // Without some nodes in the tree having empty base times.
    mode |= ProfileMode;
  }

  return createFiber(HostRoot, null, null, mode);
}
function createFiberFromTypeAndProps(type, // React$ElementType
key, pendingProps, owner, mode, lanes) {
  var fiberTag = IndeterminateComponent; // The resolved type is set if we know what the final type will be. I.e. it's not lazy.

  var resolvedType = type;

  if (typeof type === 'function') {
    if (shouldConstruct(type)) {
      fiberTag = ClassComponent;
    }
  } else if (typeof type === 'string') {
    if ( supportsResources && enableHostSingletons && supportsSingletons) {
      var hostContext = getHostContext();
      fiberTag = isHostResourceType(type, pendingProps, hostContext) ? HostResource : isHostSingletonType(type) ? HostSingleton : HostComponent;
    } else if ( supportsResources) {
      var _hostContext = getHostContext();

      fiberTag = isHostResourceType(type, pendingProps, _hostContext) ? HostResource : HostComponent;
    } else if ( supportsSingletons) {
      fiberTag = isHostSingletonType(type) ? HostSingleton : HostComponent;
    } else {
      fiberTag = HostComponent;
    }
  } else {
    getTag: switch (type) {
      case REACT_FRAGMENT_TYPE:
        return createFiberFromFragment(pendingProps.children, mode, lanes, key);

      case REACT_STRICT_MODE_TYPE:
        fiberTag = Mode;
        mode |= StrictLegacyMode;

        if ((mode & ConcurrentMode) !== NoMode) {
          // Strict effects should never run on legacy roots
          mode |= StrictEffectsMode;
        }

        break;

      case REACT_PROFILER_TYPE:
        return createFiberFromProfiler(pendingProps, mode, lanes, key);

      case REACT_SUSPENSE_TYPE:
        return createFiberFromSuspense(pendingProps, mode, lanes, key);

      case REACT_SUSPENSE_LIST_TYPE:
        return createFiberFromSuspenseList(pendingProps, mode, lanes, key);

      case REACT_OFFSCREEN_TYPE:
        return createFiberFromOffscreen(pendingProps, mode, lanes, key);

      case REACT_LEGACY_HIDDEN_TYPE:

      // eslint-disable-next-line no-fallthrough

      case REACT_SCOPE_TYPE:

      // eslint-disable-next-line no-fallthrough

      case REACT_CACHE_TYPE:
        {
          return createFiberFromCache(pendingProps, mode, lanes, key);
        }

      // eslint-disable-next-line no-fallthrough

      case REACT_TRACING_MARKER_TYPE:

      // eslint-disable-next-line no-fallthrough

      case REACT_DEBUG_TRACING_MODE_TYPE:

      // eslint-disable-next-line no-fallthrough

      default:
        {
          if (typeof type === 'object' && type !== null) {
            switch (type.$$typeof) {
              case REACT_PROVIDER_TYPE:
                fiberTag = ContextProvider;
                break getTag;

              case REACT_CONTEXT_TYPE:
                // This is a consumer
                fiberTag = ContextConsumer;
                break getTag;

              case REACT_FORWARD_REF_TYPE:
                fiberTag = ForwardRef;

                break getTag;

              case REACT_MEMO_TYPE:
                fiberTag = MemoComponent;
                break getTag;

              case REACT_LAZY_TYPE:
                fiberTag = LazyComponent;
                resolvedType = null;
                break getTag;
            }
          }

          var info = '';

          throw new Error('Element type is invalid: expected a string (for built-in ' + 'components) or a class/function (for composite components) ' + ("but got: " + (type == null ? type : typeof type) + "." + info));
        }
    }
  }

  var fiber = createFiber(fiberTag, pendingProps, key, mode);
  fiber.elementType = type;
  fiber.type = resolvedType;
  fiber.lanes = lanes;

  return fiber;
}
function createFiberFromElement(element, mode, lanes) {
  var owner = null;

  var type = element.type;
  var key = element.key;
  var pendingProps = element.props;
  var fiber = createFiberFromTypeAndProps(type, key, pendingProps, owner, mode, lanes);

  return fiber;
}
function createFiberFromFragment(elements, mode, lanes, key) {
  var fiber = createFiber(Fragment, elements, key, mode);
  fiber.lanes = lanes;
  return fiber;
}

function createFiberFromProfiler(pendingProps, mode, lanes, key) {

  var fiber = createFiber(Profiler, pendingProps, key, mode | ProfileMode);
  fiber.elementType = REACT_PROFILER_TYPE;
  fiber.lanes = lanes;

  {
    fiber.stateNode = {
      effectDuration: 0,
      passiveEffectDuration: 0
    };
  }

  return fiber;
}

function createFiberFromSuspense(pendingProps, mode, lanes, key) {
  var fiber = createFiber(SuspenseComponent, pendingProps, key, mode);
  fiber.elementType = REACT_SUSPENSE_TYPE;
  fiber.lanes = lanes;
  return fiber;
}
function createFiberFromSuspenseList(pendingProps, mode, lanes, key) {
  var fiber = createFiber(SuspenseListComponent, pendingProps, key, mode);
  fiber.elementType = REACT_SUSPENSE_LIST_TYPE;
  fiber.lanes = lanes;
  return fiber;
}
function createFiberFromOffscreen(pendingProps, mode, lanes, key) {
  var fiber = createFiber(OffscreenComponent, pendingProps, key, mode);
  fiber.elementType = REACT_OFFSCREEN_TYPE;
  fiber.lanes = lanes;
  var primaryChildInstance = {
    _visibility: OffscreenVisible,
    _pendingVisibility: OffscreenVisible,
    _pendingMarkers: null,
    _retryCache: null,
    _transitions: null,
    _current: null,
    detach: function () {
      return detachOffscreenInstance(primaryChildInstance);
    },
    attach: function () {
      return attachOffscreenInstance(primaryChildInstance);
    }
  };
  fiber.stateNode = primaryChildInstance;
  return fiber;
}
function createFiberFromCache(pendingProps, mode, lanes, key) {
  var fiber = createFiber(CacheComponent, pendingProps, key, mode);
  fiber.elementType = REACT_CACHE_TYPE;
  fiber.lanes = lanes;
  return fiber;
}
function createFiberFromText(content, mode, lanes) {
  var fiber = createFiber(HostText, content, null, mode);
  fiber.lanes = lanes;
  return fiber;
}
function createFiberFromHostInstanceForDeletion() {
  var fiber = createFiber(HostComponent, null, null, NoMode);
  fiber.elementType = 'DELETED';
  return fiber;
}
function createFiberFromDehydratedFragment(dehydratedNode) {
  var fiber = createFiber(DehydratedFragment, null, null, NoMode);
  fiber.stateNode = dehydratedNode;
  return fiber;
}
function createFiberFromPortal(portal, mode, lanes) {
  var pendingProps = portal.children !== null ? portal.children : [];
  var fiber = createFiber(HostPortal, pendingProps, portal.key, mode);
  fiber.lanes = lanes;
  fiber.stateNode = {
    containerInfo: portal.containerInfo,
    pendingChildren: null,
    // Used by persistent updates
    implementation: portal.implementation
  };
  return fiber;
} // Used for stashing WIP properties to replay failed work in DEV.

function FiberRootNode(containerInfo, tag, hydrate, identifierPrefix, onRecoverableError) {
  this.tag = tag;
  this.containerInfo = containerInfo;
  this.pendingChildren = null;
  this.current = null;
  this.pingCache = null;
  this.finishedWork = null;
  this.timeoutHandle = noTimeout;
  this.context = null;
  this.pendingContext = null;
  this.callbackNode = null;
  this.callbackPriority = NoLane;
  this.eventTimes = createLaneMap(NoLanes);
  this.expirationTimes = createLaneMap(NoTimestamp);
  this.pendingLanes = NoLanes;
  this.suspendedLanes = NoLanes;
  this.pingedLanes = NoLanes;
  this.expiredLanes = NoLanes;
  this.mutableReadLanes = NoLanes;
  this.finishedLanes = NoLanes;
  this.errorRecoveryDisabledLanes = NoLanes;
  this.entangledLanes = NoLanes;
  this.entanglements = createLaneMap(NoLanes);
  this.hiddenUpdates = createLaneMap(null);
  this.identifierPrefix = identifierPrefix;
  this.onRecoverableError = onRecoverableError;

  {
    this.pooledCache = null;
    this.pooledCacheLanes = NoLanes;
  }

  if (supportsHydration) {
    this.mutableSourceEagerHydrationData = null;
  }

  this.incompleteTransitions = new Map();

  {
    this.effectDuration = 0;
    this.passiveEffectDuration = 0;
  }

  {
    this.memoizedUpdaters = new Set();
    var pendingUpdatersLaneMap = this.pendingUpdatersLaneMap = [];

    for (var _i = 0; _i < TotalLanes; _i++) {
      pendingUpdatersLaneMap.push(new Set());
    }
  }
}

function createFiberRoot(containerInfo, tag, hydrate, initialChildren, hydrationCallbacks, isStrictMode, concurrentUpdatesByDefaultOverride, // TODO: We have several of these arguments that are conceptually part of the
// host config, but because they are passed in at runtime, we have to thread
// them through the root constructor. Perhaps we should put them all into a
// single type, like a DynamicHostConfig that is defined by the renderer.
identifierPrefix, onRecoverableError, transitionCallbacks) {
  // $FlowFixMe[invalid-constructor] Flow no longer supports calling new on functions
  var root = new FiberRootNode(containerInfo, tag, hydrate, identifierPrefix, onRecoverableError);
  // stateNode is any.


  var uninitializedFiber = createHostRootFiber(tag, isStrictMode);
  root.current = uninitializedFiber;
  uninitializedFiber.stateNode = root;

  {
    var initialCache = createCache();
    retainCache(initialCache); // The pooledCache is a fresh cache instance that is used temporarily
    // for newly mounted boundaries during a render. In general, the
    // pooledCache is always cleared from the root at the end of a render:
    // it is either released when render commits, or moved to an Offscreen
    // component if rendering suspends. Because the lifetime of the pooled
    // cache is distinct from the main memoizedState.cache, it must be
    // retained separately.

    root.pooledCache = initialCache;
    retainCache(initialCache);
    var initialState = {
      element: initialChildren,
      isDehydrated: hydrate,
      cache: initialCache
    };
    uninitializedFiber.memoizedState = initialState;
  }

  initializeUpdateQueue(uninitializedFiber);
  return root;
}

// TODO: this is special because it gets imported during build.
//
// TODO: 18.0.0 has not been released to NPM;
// It exists as a placeholder so that DevTools can support work tag changes between releases.
// When we next publish a release, update the matching TODO in backend/renderer.js
// TODO: This module is used both by the release scripts and to expose a version
// at runtime. We should instead inject the version number as part of the build
// process, and use the ReactVersions.js module as the single source of truth.
var ReactVersion = '18.2.0';

function createPortal(children, containerInfo, // TODO: figure out the API for cross-renderer implementation.
implementation) {
  var key = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : null;

  return {
    // This tag allow us to uniquely identify this as a React Portal
    $$typeof: REACT_PORTAL_TYPE,
    key: key == null ? null : '' + key,
    children: children,
    containerInfo: containerInfo,
    implementation: implementation
  };
}

function getContextForSubtree(parentComponent) {
  if (!parentComponent) {
    return emptyContextObject;
  }

  var fiber = get(parentComponent);
  var parentContext = findCurrentUnmaskedContext(fiber);

  if (fiber.tag === ClassComponent) {
    var Component = fiber.type;

    if (isContextProvider(Component)) {
      return processChildContext(fiber, Component, parentContext);
    }
  }

  return parentContext;
}

function findHostInstance(component) {
  var fiber = get(component);

  if (fiber === undefined) {
    if (typeof component.render === 'function') {
      throw new Error('Unable to find node on an unmounted component.');
    } else {
      var keys = Object.keys(component).join(',');
      throw new Error("Argument appears to not be a ReactComponent. Keys: " + keys);
    }
  }

  var hostFiber = findCurrentHostFiber(fiber);

  if (hostFiber === null) {
    return null;
  }

  return hostFiber.stateNode;
}

function findHostInstanceWithWarning(component, methodName) {

  return findHostInstance(component);
}

function createContainer(containerInfo, tag, hydrationCallbacks, isStrictMode, concurrentUpdatesByDefaultOverride, identifierPrefix, onRecoverableError, transitionCallbacks) {
  var hydrate = false;
  var initialChildren = null;
  return createFiberRoot(containerInfo, tag, hydrate, initialChildren, hydrationCallbacks, isStrictMode, concurrentUpdatesByDefaultOverride, identifierPrefix, onRecoverableError);
}
function createHydrationContainer(initialChildren, // TODO: Remove `callback` when we delete legacy mode.
callback, containerInfo, tag, hydrationCallbacks, isStrictMode, concurrentUpdatesByDefaultOverride, identifierPrefix, onRecoverableError, transitionCallbacks) {
  var hydrate = true;
  var root = createFiberRoot(containerInfo, tag, hydrate, initialChildren, hydrationCallbacks, isStrictMode, concurrentUpdatesByDefaultOverride, identifierPrefix, onRecoverableError); // TODO: Move this to FiberRoot constructor

  root.context = getContextForSubtree(null); // Schedule the initial render. In a hydration root, this is different from
  // a regular update because the initial render must match was was rendered
  // on the server.
  // NOTE: This update intentionally doesn't have a payload. We're only using
  // the update to schedule work on the root fiber (and, for legacy roots, to
  // enqueue the callback if one is provided).

  var current = root.current;
  var eventTime = requestEventTime();
  var lane = requestUpdateLane(current);
  var update = createUpdate(eventTime, lane);
  update.callback = callback !== undefined && callback !== null ? callback : null;
  enqueueUpdate$1(current, update, lane);
  scheduleInitialHydrationOnRoot(root, lane, eventTime);
  return root;
}
function updateContainer(element, container, parentComponent, callback) {

  var current = container.current;
  var eventTime = requestEventTime();
  var lane = requestUpdateLane(current);

  {
    markRenderScheduled(lane);
  }

  var context = getContextForSubtree(parentComponent);

  if (container.context === null) {
    container.context = context;
  } else {
    container.pendingContext = context;
  }

  var update = createUpdate(eventTime, lane); // Caution: React DevTools currently depends on this property
  // being called "element".

  update.payload = {
    element: element
  };
  callback = callback === undefined ? null : callback;

  if (callback !== null) {

    update.callback = callback;
  }

  var root = enqueueUpdate$1(current, update, lane);

  if (root !== null) {
    scheduleUpdateOnFiber(root, current, lane, eventTime);
    entangleTransitions(root, current, lane);
  }

  return lane;
}
function getPublicRootInstance(container) {
  var containerFiber = container.current;

  if (!containerFiber.child) {
    return null;
  }

  switch (containerFiber.child.tag) {
    case HostSingleton:
    case HostComponent:
      return getPublicInstance(containerFiber.child.stateNode);

    default:
      return containerFiber.child.stateNode;
  }
}
function attemptSynchronousHydration(fiber) {
  switch (fiber.tag) {
    case HostRoot:
      {
        var root = fiber.stateNode;

        if (isRootDehydrated(root)) {
          // Flush the first scheduled "update".
          var lanes = getHighestPriorityPendingLanes(root);
          flushRoot(root, lanes);
        }

        break;
      }

    case SuspenseComponent:
      {
        flushSync(function () {
          var root = enqueueConcurrentRenderForLane(fiber, SyncLane);

          if (root !== null) {
            var eventTime = requestEventTime();
            scheduleUpdateOnFiber(root, fiber, SyncLane, eventTime);
          }
        }); // If we're still blocked after this, we need to increase
        // the priority of any promises resolving within this
        // boundary so that they next attempt also has higher pri.

        var retryLane = SyncLane;
        markRetryLaneIfNotHydrated(fiber, retryLane);
        break;
      }
  }
}

function markRetryLaneImpl(fiber, retryLane) {
  var suspenseState = fiber.memoizedState;

  if (suspenseState !== null && suspenseState.dehydrated !== null) {
    suspenseState.retryLane = higherPriorityLane(suspenseState.retryLane, retryLane);
  }
} // Increases the priority of thenables when they resolve within this boundary.


function markRetryLaneIfNotHydrated(fiber, retryLane) {
  markRetryLaneImpl(fiber, retryLane);
  var alternate = fiber.alternate;

  if (alternate) {
    markRetryLaneImpl(alternate, retryLane);
  }
}

function attemptDiscreteHydration(fiber) {
  if (fiber.tag !== SuspenseComponent) {
    // We ignore HostRoots here because we can't increase
    // their priority and they should not suspend on I/O,
    // since you have to wrap anything that might suspend in
    // Suspense.
    return;
  }

  var lane = SyncLane;
  var root = enqueueConcurrentRenderForLane(fiber, lane);

  if (root !== null) {
    var eventTime = requestEventTime();
    scheduleUpdateOnFiber(root, fiber, lane, eventTime);
  }

  markRetryLaneIfNotHydrated(fiber, lane);
}
function attemptContinuousHydration(fiber) {
  if (fiber.tag !== SuspenseComponent) {
    // We ignore HostRoots here because we can't increase
    // their priority and they should not suspend on I/O,
    // since you have to wrap anything that might suspend in
    // Suspense.
    return;
  }

  var lane = SelectiveHydrationLane;
  var root = enqueueConcurrentRenderForLane(fiber, lane);

  if (root !== null) {
    var eventTime = requestEventTime();
    scheduleUpdateOnFiber(root, fiber, lane, eventTime);
  }

  markRetryLaneIfNotHydrated(fiber, lane);
}
function attemptHydrationAtCurrentPriority(fiber) {
  if (fiber.tag !== SuspenseComponent) {
    // We ignore HostRoots here because we can't increase
    // their priority other than synchronously flush it.
    return;
  }

  var lane = requestUpdateLane(fiber);
  var root = enqueueConcurrentRenderForLane(fiber, lane);

  if (root !== null) {
    var eventTime = requestEventTime();
    scheduleUpdateOnFiber(root, fiber, lane, eventTime);
  }

  markRetryLaneIfNotHydrated(fiber, lane);
}
function findHostInstanceWithNoPortals(fiber) {
  var hostFiber = findCurrentHostFiberWithNoPortals(fiber);

  if (hostFiber === null) {
    return null;
  }

  return hostFiber.stateNode;
}

var shouldErrorImpl = function (fiber) {
  return null;
};

function shouldError(fiber) {
  return shouldErrorImpl();
}

var shouldSuspendImpl = function (fiber) {
  return false;
};

function shouldSuspend(fiber) {
  return shouldSuspendImpl();
}
var overrideHookState = null;
var overrideHookStateDeletePath = null;
var overrideHookStateRenamePath = null;
var overrideProps = null;
var overridePropsDeletePath = null;
var overridePropsRenamePath = null;
var scheduleUpdate = null;
var setErrorHandler = null;
var setSuspenseHandler = null;

function findHostInstanceByFiber(fiber) {
  var hostFiber = findCurrentHostFiber(fiber);

  if (hostFiber === null) {
    return null;
  }

  return hostFiber.stateNode;
}

function emptyFindFiberByHostInstance(instance) {
  return null;
}

function injectIntoDevTools(devToolsConfig) {
  var findFiberByHostInstance = devToolsConfig.findFiberByHostInstance;
  var ReactCurrentDispatcher = ReactSharedInternals.ReactCurrentDispatcher;
  return injectInternals({
    bundleType: devToolsConfig.bundleType,
    version: devToolsConfig.version,
    rendererPackageName: devToolsConfig.rendererPackageName,
    rendererConfig: devToolsConfig.rendererConfig,
    overrideHookState: overrideHookState,
    overrideHookStateDeletePath: overrideHookStateDeletePath,
    overrideHookStateRenamePath: overrideHookStateRenamePath,
    overrideProps: overrideProps,
    overridePropsDeletePath: overridePropsDeletePath,
    overridePropsRenamePath: overridePropsRenamePath,
    setErrorHandler: setErrorHandler,
    setSuspenseHandler: setSuspenseHandler,
    scheduleUpdate: scheduleUpdate,
    currentDispatcherRef: ReactCurrentDispatcher,
    findHostInstanceByFiber: findHostInstanceByFiber,
    findFiberByHostInstance: findFiberByHostInstance || emptyFindFiberByHostInstance,
    // React Refresh
    findHostInstancesForRefresh:  null,
    scheduleRefresh:  null,
    scheduleRoot:  null,
    setRefreshHandler:  null,
    // Enables DevTools to append owner stacks to error messages in DEV mode.
    getCurrentFiber:  null,
    // Enables DevTools to detect reconciler version rather than renderer version
    // which may not match for third party renderers.
    reconcilerVersion: ReactVersion
  });
}

exports.attemptContinuousHydration = attemptContinuousHydration;
exports.attemptDiscreteHydration = attemptDiscreteHydration;
exports.attemptHydrationAtCurrentPriority = attemptHydrationAtCurrentPriority;
exports.attemptSynchronousHydration = attemptSynchronousHydration;
exports.batchedUpdates = batchedUpdates;
exports.createComponentSelector = createComponentSelector;
exports.createContainer = createContainer;
exports.createHasPseudoClassSelector = createHasPseudoClassSelector;
exports.createHydrationContainer = createHydrationContainer;
exports.createPortal = createPortal;
exports.createRoleSelector = createRoleSelector;
exports.createTestNameSelector = createTestNameSelector;
exports.createTextSelector = createTextSelector;
exports.deferredUpdates = deferredUpdates;
exports.discreteUpdates = discreteUpdates;
exports.findAllNodes = findAllNodes;
exports.findBoundingRects = findBoundingRects;
exports.findHostInstance = findHostInstance;
exports.findHostInstanceWithNoPortals = findHostInstanceWithNoPortals;
exports.findHostInstanceWithWarning = findHostInstanceWithWarning;
exports.flushControlled = flushControlled;
exports.flushPassiveEffects = flushPassiveEffects;
exports.flushSync = flushSync;
exports.focusWithin = focusWithin;
exports.getCurrentUpdatePriority = getCurrentUpdatePriority;
exports.getFindAllNodesFailureDescription = getFindAllNodesFailureDescription;
exports.getPublicRootInstance = getPublicRootInstance;
exports.injectIntoDevTools = injectIntoDevTools;
exports.isAlreadyRendering = isAlreadyRendering;
exports.observeVisibleRects = observeVisibleRects;
exports.registerMutableSourceForHydration = registerMutableSourceForHydration;
exports.runWithPriority = runWithPriority;
exports.shouldError = shouldError;
exports.shouldSuspend = shouldSuspend;
exports.updateContainer = updateContainer;
    return exports;
  };
}
