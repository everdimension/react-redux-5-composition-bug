## Description
If two `connect` components are passed different stores
and are nested, one of them doesn't react to store updates.

This is a problem in `react-redux@5`.

If you install `react-redux@4`, components are updated correctly.
