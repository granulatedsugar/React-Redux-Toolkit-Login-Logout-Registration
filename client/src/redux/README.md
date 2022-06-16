Create Slice Reducers and Actions
Instead of creating many folders and files for Redux (actions, reducers, types,…), with redux-toolkit we just need all-in-one: slice.

A slice is a collection of Redux reducer logic and actions for a single feature.

For creating a slice, we need:

name to identify the slice
initial state value
one or more reducer functions to define how the state can be updated
Once a slice is created, we can export the generated Redux action creators and the reducer function for the whole slice.

Redux Toolkit provides createSlice() function that will auto-generate the action types and action creators for you, based on the names of the reducer functions you provide.
