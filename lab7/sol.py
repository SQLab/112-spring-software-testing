import angr,sys
project = angr.Project('./login')
init_state = project.factory.entry_state()
simulation = project.factory.simgr(init_state)

def success_condition(state):
    return b"Login successful" in state.posix.dumps(sys.stdout.fileno())

def fail_condition(state):
    return b"Login failed" in state.posix.dumps(sys.stdout.fileno())

simulation.explore(find=success_condition, avoid=fail_condition)

solution_state = simulation.found[0]

print (solution_state.posix.dumps(sys.stdin.fileno()))

