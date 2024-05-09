import angr, sys



def success_condition(state):
    return b"Login successful" in state.posix.dumps(sys.stdout.fileno())

def fail_condition(state):
    return b"Login failed" in state.posix.dumps(sys.stdout.fileno())


proj = angr.Project('./login')

initial_state = proj.factory.entry_state()
simulation = proj.factory.simgr(initial_state)
simulation.explore(find=success_condition, avoid=fail_condition)

soulution = simulation.found[0]
print(soulution.posix.dumps(sys.stdin.fileno()))