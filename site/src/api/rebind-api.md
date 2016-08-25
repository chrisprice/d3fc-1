---
layout: api
section: api
title: rebind-api
structure:
  - title: d3fc-rebind
    level: 1
    content: >+
      Utilities for copying methods from one d3 component to another in a
      configurable way

  - title: API
    level: 1
    content: ''
    children:
      - title: Functions
        level: 2
        content: >
          *fc*.**rebind**(*target*, *source*, *...names*)


          Provides the same functionality as
          [`d3.rebind`](https://github.com/mbostock/d3/wiki/Internals#rebind) -


          > Copies the methods with the specified `names` from `source` to
          `target`, and returns `target`. Calling one of the named methods on
          the target object invokes the same-named method on the source object,
          passing any arguments passed to the target method, and using the
          source object as the this context. If the source method returns the
          source object, the target method returns the target object (“setter”
          method); otherwise, the target method returns the return value of the
          source method (“getter” mode). The rebind operator allows inherited
          methods (mix-ins) to be rebound to a subclass on a different object.


          *fc*.**rebindAll**(*target*, *source*, *[...transforms]*)


          Provides the same functionality as `rebind` but copies **all**
          properties found on `source` to `target`. Optionally, property name
          transforms can be specified. These receive a source property name and
          return either the target property name or a falsey value to indicate
          the property should not be copied.
      - title: Transform functions
        level: 2
        content: >
          As well as creating transforms manually, the following may be useful
          (especially if you're not able to use ES2015 features) -


          *fc*.**exclude**(*...names*)


          Exclude a set of property `names`. Names can be specified as a
          `string` or `RegExp`.


          *fc*.**include**(*...names*)


          Include only the set of property `names`. Names can be specified as a
          `string` or `RegExp`.


          *fc*.**includeMap**(*mappings*)


          Include only the set of properties specified by the keys of `mappings`
          using their corresponding values as the target property name e.g. `{
          'sourceName': 'targetName' }`.


          *fc*.**prefix**(*str*)


          Prefix all property names with `str`.

---
