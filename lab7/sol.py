import angr

def success_condition(state: angr.SimState):
    return b'Login successful' in state.posix.dumps(1)
    

def fail_condition(state: angr.SimState):
    return b'Login failed' in state.posix.dumps(1)

project = angr.Project('./login')
init_state = project.factory.entry_state()
simulation = project.factory.simgr(init_state)
simulation.explore(find=success_condition, avoid=fail_condition)
solution = simulation.found[0]
print(solution.posix.dumps(0))
