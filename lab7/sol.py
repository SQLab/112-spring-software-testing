import angr, sys

def success_condition(state):
    return  b"Login successful" in state.posix.dumps(sys.stdout.fileno())

def fail_condition(state):
    return b"Login failed" in state.posix.dumps(sys.stdout.fileno())

proj = angr.Project('./login')
init_state = proj.factory.entry_state()
simulation = proj.factory.simgr(init_state)
simulation.explore(find = success_condition, avoid = fail_condition)
solution = simulation.found[0]

print(solution.posix.dumps(sys.stdin.fileno()))
