import angr, sys

def success_condition(state) :
    output = state.posix.dumps(sys.stdout.fileno())
    return b"Login successful" in output

def fail_condition(state) :
    output = state.posix.dumps(sys.stdout.fileno())
    return b"Login failed" in output

project = angr.Project('./login')
initial_state = project.factory.entry_state()
simulation = project.factory.simgr(initial_state)
simulation.explore(find=success_condition, avoid=fail_condition)
solution = simulation.found[0]
output = solution.posix.dumps(sys.stdin.fileno())
print(output)