---
layout: api
section: api
title: random-data-api
structure:
  - title: d3fc-random-data
    level: 1
    content: >+
      Components for generating random data series based on stochastic
      processes.

  - title: Financial
    level: 1
    content: >+
      The random financial data generator component generates
      open-high-low-close-volume financial data.

      Prices are calculated using the [geometric Brownian motion
      generator](#geometric-brownian-motion).

    children:
      - title: Example usage
        level: 2
        content: >
          ```javascript


          import { randomFinancial, randomSkipWeekends } from
          'd3fc-random-data';


          const generator = randomFinancial()
              .startDate(new Date(2016, 0, 1))
              .startPrice(100)
              .filter(randomSkipWeekends)

          generator(4)


          // [

          //   {

          //     date: 2016-01-01T00:00:00.000Z,

          //     open: 100,

          //     high: 100.37497903455065,

          //     low: 99.9344064016257,

          //     close: 100.13532170178823,

          //     volume: 974

          //   },

          //   {

          //     date: 2016-01-04T00:00:00.000Z,

          //     open: 100.2078374019404,

          //     high: 100.55251268471399,

          //     low: 99.7272105851512,

          //     close: 99.7272105851512,

          //     volume: 992

          //   },

          //   {

          //     date: 2016-01-05T00:00:00.000Z,

          //     open: 99.7272105851512,

          //     high: 101.06403178230532,

          //     low: 99.7272105851512,

          //     close: 101.00200313600685,

          //     volume: 835

          //   },

          //   {

          //     date: 2016-01-06T00:00:00.000Z,

          //     open: 101.00200313600685,

          //     high: 101.41129520567128,

          //     low: 100.50311227829566,

          //     close: 100.5536971451326,

          //     volume: 1021

          //   }

          // ]


          ```
      - title: Example Usage - Stream
        level: 2
        content: |
          ```javascript

          import { randomFinancial } from 'd3fc-random-data';

          const generator = financial()
              .startDate(new Date(2016, 0, 1))
              .startPrice(100)

          const stream = generator.stream();
          const data = [];

          data.push(stream.next());
          // data.length -> 1

          data = data.concat(stream.take(2));
          // data.length -> 3

          data = data.concat(stream.until(d => d.date > new Date(2016, 0, 10)));
          // data.length -> 10

          ```
      - title: API
        level: 2
        content: >+
          ### Financial


          *fc*.**randomFinancial**()


          Constructs a new financial data generator.


          *randomFinancial*.**startDate**([*value*])


          If *value* is specified, sets the start date to the specified `Date`
          object and returns this generator instance.

          If *value* is not specified, returns the current start date, which
          defaults to the value of `new Date()` when the generator was
          constructed.


          *randomFinancial*.**startPrice**([*value*])


          If *value* is specified, sets the start price to the specified number
          and returns this generator instance.

          If *value* is not specified, returns the current start price, which
          defaults to `100`.


          *randomFinancial*.**interval**([*value*])


          If *value* is specified, sets the time increment to the specified [d3
          time interval](https://github.com/d3/d3-time#intervals) and returns
          this generator instance.

          If *value* is not specified, returns the current interval, which
          defaults to `d3_time.timeDay`.


          *randomFinancial*.**intervalStep**([*value*])


          If *value* is specified, sets the number of intervals that returned
          points should have dates offset by to the specified integer number and
          returns this generator instance.

          If *value* is not specified, returns the current number of intervals,
          which defaults to `1`.

          Internally, this value is supplied to the *step* argument of an
          interval's [offset
          function](https://github.com/d3/d3-time#interval_offset).


          *randomFinancial*.**steps**([*value*])


          Get/Set the number of [steps used by the geometric Brownian motion
          simulation](#gbm_steps) per *intervalStep* number of intervals.

          A higher number gives a slower, but higher resolution simulation.


          *randomFinancial*.**mu**([*value*])


          Get/Set the [drift used by the geometric Brownian motion
          simulation](#gbm_mu).  


          *randomFinancial*.**sigma**([*value*])


          Get/Set the [volatility used by the geometric Brownian motion
          simulation](#gbm_sigma).  


          *randomFinancial*.**unitInterval**([*value*])


          If *value* is specified, sets the time interval used for units of *mu*
          and *sigma* to the specified [d3 time
          interval](https://github.com/d3/d3-time#intervals) and returns this
          generator instance.

          If *value* is not specified, returns the current interval, which
          defaults to `d3_time.timeYear`.


          *randomFinancial*.**unitIntervalStep**([*value*])


          If *value* is specified, sets the integer number of intervals used for
          units of *mu* and *sigma* to the specified number and returns this
          generator instance.

          If *value* is not specified, returns the current interval, which
          defaults to `1`.

          For example, to have trading year units of *mu* and *sigma* rather
          than calendar year, set *unitIntervalStep* to `252` and *unitInterval*
          to `d3_time.timeDay`.


          *randomFinancial*.**volume**([*value*])


          If *value* is specified, sets the function used return a point's
          volume to the specified function and returns this generator instance.

          Can be specified as either a function mapping an output object to a
          number, or a number.

          If *value* is not specified, returns the current volume, which
          defaults to a function sampling integers from a normal distribution
          centred around `1000`.


          *randomFinancial*.**filter**([*value*])


          If *value* is specified, sets the filter function to the specified
          function and returns this generator instance.

          Only output objects `d` for which `filter(d)` returns `true` will be
          included in the output array.

          If *value* is not specified, returns the current filter function,
          which defaults to `(d) => true`.

          To skip weekends, supply the pre-defined filter
          `fc_random_data.skipWeekends`.


          *randomFinancial*(*points*)


          Run the generator. Returns an array with *points* number of objects
          with `date`, `open`, `high`, `low`, `close` and `volume` properties.



          ### Stream


          Use the streaming interface to have successive calls to generate data
          keep track of the latest date and price.


          *randomFinancial*.**stream**()


          Constructs a new stream from an existing financial data generator
          instance.


          *stream*.**next**()


          Returns a single output object with date incremented from the latest
          returned output object's date according to the generator instance's
          *interval* and *intervalStep* properties, or with *startDate* if this
          is the first call.


          *stream*.**take**(number)


          Returns an array of length *number* of output objects, each object
          with date incremented according to the generator instance's *interval*
          and *intervalStep* properties, starting with the latest returned
          output objects's incremented date, or with *startDate* if this is the
          first call.


          *stream*.**until**(comparison)


          Returns the array of objects constructed by repeatedly generating a
          single output object with date incremented according to the generator
          instance's *interval* and *intervalStep* properties until a generated
          object satisfies the condition of the supplied comparison function,
          appending to the output array only if the condition is not satisfied.

  - title: Geometric Brownian Motion
    level: 1
    content: >+
      The geometric Brownian motion component creates a series of values based
      on the [Geometric Brownian
      Motion](https://en.wikipedia.org/wiki/Geometric_Brownian_motion)
      stochastic process.

    children:
      - title: Example Usage
        level: 2
        content: |
          ``` javascript

          import { randomGeometricBrownianMotion } from 'd3fc-random-data';

          const generator = randomGeometricBrownianMotion()
              .steps(10);

          generator(10);

          // [
          //   10,
          //   10.272847363463436,
          //   10.423881104466574,
          //   10.629316182766384,
          //   10.7209321393133,
          //   10.773722182206432,
          //   10.229636144307582,
          //   10.225282323984114,
          //   10.488138829847468,
          //   10.428118194568341,
          //   10.848822656937935
          // ]

          ```
      - title: API
        level: 2
        content: >
          *fc*.**randomGeometricBrownianMotion**()


          Constructs a new geometric Brownian motion generator.


          <a name="gbm_mu" href="#gbm_mu"></a>
          *randomGeometricBrownianMotion*.**mu**([*value*])


          If *value* is specified, sets the percentage drift per period to the
          specified number and returns this generator instance.

          If *value* is not specified, returns the current drift, which defaults
          to `0.1`.


          <a name="gbm_sigma" href="#gbm_sigma"></a>
          *randomGeometricBrownianMotion*.**sigma**([*value*])


          If *value* is specified, sets the percentage volatility per period to
          the specified number and returns this generator instance.

          If *value* is not specified, returns the current volatility, which
          defaults to `0.1`.


          *randomGeometricBrownianMotion*.**period**([*value*])


          If *value* is specified, sets the interval length to the specified
          number of periods and returns this generator instance.

          If *value* is not specified, returns the current interval length,
          which defaults to `1`.


          <a name="gbm_steps" href="#gbm_steps"></a>
          *randomGeometricBrownianMotion*.**steps**([*value*])


          If *value* is specified, sets the number of discrete steps to divide
          the interval into to the specified number and returns this generator
          instance.

          If *value* is not specified, returns the current number of steps,
          which defaults to `20`.


          *randomGeometricBrownianMotion*.**randomNormal**([*value*])


          If *value* is specified, sets the function used for generating random
          numbers with a normal (Gaussian) distribution to the specified
          function and returns this generator instance.

          If *value* is not specified, returns the current random normal
          function, which defaults to
          [`d3_random.randomNormal`](https://github.com/d3/d3-random#randomNormal).


          *randomGeometricBrownianMotion*(*start*)


          Returns an array of price values following a geometric Brownian motion
          with the set drift and volatility, given a starting price of *start*.

          The first array value is the supplied start price, followed by *steps*
          number of values corresponding to the simulated price value at the end
          of each step.

---
